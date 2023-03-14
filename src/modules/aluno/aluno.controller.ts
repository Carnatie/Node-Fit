import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { UpdateAlunoDTO } from './aluno.dto';

@ApiTags('Aluno')
@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Get()
  @Roles(Role.Professor)
  async acharAlunos() {
    const alunos = await this.alunoService.acharAlunos();
    return alunos;
  }

  @Get(':id')
  @Roles(Role.Professor)
  async acharUmAluno(@Param('id') id: number, @Param('email') email: string) {
    const aluno = await this.alunoService.acharUmAluno(id, email);
    return aluno;
  }

  @Put(':id')
  @Roles(Role.Professor)
  async atualizarAluno(@Param('id') id: number, @Body() data: UpdateAlunoDTO) {
    return await this.alunoService.atualizarAluno(id, data);
  }

  @Delete(':id')
  @Roles(Role.Professor)
  async deletarAluno(@Param('id') id: number) {
    return await this.alunoService.deletarAluno(id);
  }
}
