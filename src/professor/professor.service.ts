import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProfessorDTO, UpdateProfessorDTO } from './dto/professor.dto';

@Injectable()
export class ProfessorService {
  constructor(private prisma: PrismaService) {}

  async criarProfessor(data: CreateProfessorDTO) {
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
      data,
    });
    return professor;
  }
  async acharProfessores() {
    return await this.prisma.professor.findMany();
  }
  async acharUmProfessor(id: number) {
    const acharProfessor = await this.prisma.professor.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!acharProfessor) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Professor não encontrado',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return acharProfessor;
  }

  async atualizarProfessor(id: number, data: UpdateProfessorDTO) {
    const acharProfessor = await this.prisma.professor.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!acharProfessor) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Professor não encontrado',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const professorAtualizado = await this.prisma.professor.update({
      where: { id: Number(id) },
      data: data,
      select: {
        nomeCompleto: true,
        email: true,
      },
    });
    return professorAtualizado;
  }

  async apagarProfessor(id: number) {
    const acharProfessor = await this.prisma.professor.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!acharProfessor) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Professor não encontrado',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.professor.delete({
      where: {
        id: Number(id),
      },
    });
    return HttpStatus.ACCEPTED;
  }
}
