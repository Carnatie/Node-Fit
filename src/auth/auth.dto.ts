import { ApiProperty } from '@nestjs/swagger';

export class CreateProfessorDTO {
  @ApiProperty()
  nomeCompleto: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  senhaHash: string;
}
