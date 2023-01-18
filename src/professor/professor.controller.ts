import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDTO, UpdateProfessorDTO } from './dto/professor.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  async criarProfessor(@Body() data: CreateProfessorDTO) {
    return this.professorService.criarProfessor(data);
  }

  @Get()
  async obterProfessores() {
    return this.professorService.acharProfessores();
  }

  @Get(':id')
  async obterUmProfessor(@Param('id') id: number) {
    return this.professorService.acharUmProfessor(id);
  }

  @Put(':id')
  async atualizarProfessor(
    @Param('id') id: number,
    @Body() data: UpdateProfessorDTO,
  ) {
    return this.professorService.atualizarProfessor(id, data);
  }

  @Delete(':id')
  async apagarProfessor(@Param('id') id: number) {
    return this.professorService.apagarProfessor(id);
  }
}
