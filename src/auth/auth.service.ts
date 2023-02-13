import { Injectable } from '@nestjs/common';
import { ProfessorService } from 'src/professor/professor.service';
import * as bcrypt from 'bcrypt';
import { ProfessorPayload } from './dto/userPayload.dto';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './dto/userToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private professorService: ProfessorService,
    private jwtService: JwtService,
  ) {}

  async login(username: string): Promise<UserToken> {
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

  async validateUser(username: string, password: string) {
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
