import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfessorService } from 'src/professor/professor.service';
import * as bcrypt from 'bcrypt';
import { ProfessorPayload, ProfessorToken } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateProfessorDTO } from './auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import { cryptPassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthProfessorService {
  constructor(
    private professorService: ProfessorService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async registrarProfessor(data: CreateProfessorDTO) {
    const verificaEmail = await this.prisma.professor.findUnique({
      where: {
        email: data.email,
      },
    });

    if (verificaEmail) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'E-mail ja cadastrado',
        },
        HttpStatus.CONFLICT,
      );
    }

    const professor = await this.prisma.professor.create({
      data: {
        nomeCompleto: data.nomeCompleto,
        email: data.email,
        senhaHash: await cryptPassword(data.senhaHash),
      },
    });
    return professor;
  }

  async login(username: string): Promise<ProfessorToken> {
    const professor = await this.professorService.acharEmailProfessor(username);
    const payload: ProfessorPayload = {
      sub: professor.id,
      email: professor.email,
      name: professor.nomeCompleto,
    };
    const jwtToken = this.jwtService.sign(payload);
    return {
      access_token: jwtToken,
    };
  }

  async validateProfessor(username: string, password: string) {
    const professor = await this.professorService.acharEmailProfessor(username);
    if (professor) {
      const isSenhaHashwordValid = await bcrypt.compare(
        password,
        professor.senhaHash,
      );
      if (isSenhaHashwordValid) {
        return {
          ...professor,
          senhaHash: undefined,
        };
      }
    }
    throw new Error('Email ou senha incorretos!');
  }
}
