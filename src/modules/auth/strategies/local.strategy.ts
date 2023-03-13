import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthProfessorService } from '../authProfessor.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthProfessorService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string) {
    return this.authService.validateProfessor(username, password);
  }
}
