import { Injectable } from '@nestjs/common';
import { ProfessorService } from 'src/professor/professor.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private professorService: ProfessorService) {}

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
