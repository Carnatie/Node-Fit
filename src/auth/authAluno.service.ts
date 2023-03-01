import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAlunoDTO } from './auth.dto';
import { cryptPassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthAlunoService {
  constructor(private prisma: PrismaService) {}

  async registrarAluno(data: CreateAlunoDTO, req: number) {
    const verificaEmail = await this.prisma.aluno.findUnique({
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

    const aluno = await this.prisma.aluno.create({
      data: {
        nomeCompleto: data.nomeCompleto,
        email: data.email,
        senhaHash: await cryptPassword(data.senhaHash),
        professor: { connect: { id: Number(req) } },
      },
    });
    return aluno;
  }
}
