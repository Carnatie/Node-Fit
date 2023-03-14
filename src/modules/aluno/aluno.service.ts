import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateAlunoDTO } from './aluno.dto';

@Injectable()
export class AlunoService {
  constructor(private prisma: PrismaService) {}

  async acharAlunos() {
    return await this.prisma.aluno.findMany({
      select: {
        nomeCompleto: true,
        email: true,
        professor: {
          select: {
            nomeCompleto: true,
          },
        },
      },
    });
  }

  async acharUmAluno(id: number, email: string) {
    const aluno = await this.prisma.aluno.findFirst({
      where: { OR: { id: Number(id), email } },
      select: {
        nomeCompleto: true,
        email: true,
        professor: { select: { nomeCompleto: true } },
      },
    });

    if (!aluno) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Professor não encontrado',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return aluno;
  }

  async atualizarAluno(id: number, data: UpdateAlunoDTO) {
    const aluno = await this.prisma.aluno.findFirst({
      where: { id: Number(id) },
    });
    if (!aluno) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Professor não encontrado',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const alunoAtualizado = await this.prisma.aluno.update({
      where: { id: Number(id) },
      data: data,
      select: {
        nomeCompleto: true,
        email: true,
      },
    });
    return alunoAtualizado;
  }

  async deletarAluno(id: number) {
    const aluno = await this.prisma.aluno.findFirst({
      where: { id: Number(id) },
    });
    if (!aluno) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Aluno não encontrado',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.aluno.delete({ where: { id: Number(id) } });
    return HttpStatus.ACCEPTED;
  }
}
