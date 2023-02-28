import { Request } from 'express';

export interface ProfessorPayload {
  sub: number;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

export interface ProfessorToken {
  access_token: string;
}

export interface ProfessorFromJwt {
  id: number;
  email: string;
  name: string;
}

export interface AuthRequest extends Request {
  professor: ProfessorPayload;
}
