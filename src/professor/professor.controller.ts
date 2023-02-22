import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { UpdateProfessorDTO } from './professor.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfessorDTO } from 'src/auth/auth.dto';

@ApiTags('Professor')
@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  async criarProfessor(@Body() data: CreateProfessorDTO) {
    return this.professorService.criarProfessor(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
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
