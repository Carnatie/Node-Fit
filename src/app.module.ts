import { Module } from '@nestjs/common';
import { ProfessorModule } from './modules/professor/professor.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AlunoModule } from './modules/aluno/aluno.module';

@Module({
  imports: [ProfessorModule, AuthModule, AlunoModule],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
