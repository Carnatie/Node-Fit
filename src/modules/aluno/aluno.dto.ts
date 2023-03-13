import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlunoDTO {
  @ApiProperty()
  nomeCompleto?: string;

  @ApiProperty()
  email?: string;
}
