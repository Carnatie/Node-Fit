import { ApiProperty } from '@nestjs/swagger';

export class CreateProfessorDTO {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  nomeCompleto: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  senhaHash: string;
}

export class CreateAlunoDTO {
  @ApiProperty()
  nomeCompleto: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  senhaHash: string;

  @ApiProperty()
  professor: number;
}
