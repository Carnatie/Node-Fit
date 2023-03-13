import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateProfessorDTO } from './professor.dto';

@Injectable()
export class ProfessorService {
  constructor(private prisma: PrismaService) {}

  async acharProfessores() {
    return await this.prisma.professor.findMany({
      select: {
        nomeCompleto: true,
        email: true,
      },
    });
  }
  async acharUmProfessor(id: number) {
    const acharProfessor = await this.prisma.professor.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        nomeCompleto: true,
        email: true,
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

  async acharEmailProfessor(email: string) {
    const acharProfessor = await this.prisma.professor.findFirst({
      where: {
        email: email,
      },
    });
    return acharProfessor;
  }
}
