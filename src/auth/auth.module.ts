import { Module } from '@nestjs/common';
import { AuthProfessorService } from './authProfessor.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { ProfessorModule } from 'src/professor/professor.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AlunoModule } from 'src/aluno/aluno.module';
import { AuthAlunoService } from './authAluno.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    AlunoModule,
    ProfessorModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthProfessorService,
    AuthAlunoService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
