import { Module } from '@nestjs/common';
import { ProfessorModule } from './professor/professor.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AlunoModule } from './aluno/aluno.module';

@Module({
  imports: [ProfessorModule, AuthModule, AlunoModule],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
