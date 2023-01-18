export class CreateProfessorDTO {
  nomeCompleto: string;
  email: string;
  senhaHash: string;
}

export class UpdateProfessorDTO {
  nomeCompleto?: string;
  email?: string;
}
