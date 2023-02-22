export interface ProfessorPayload {
  sub: number;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

export interface UserToken {
  access_token: string;
}

export interface UserFromJwt {
  id: number;
  email: string;
  name: string;
}
