import { Module } from '@nestjs/common';
import { ProfessorModule } from './professor/professor.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProfessorModule, AuthModule],
})
export class AppModule {}
