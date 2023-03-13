import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { UpdateProfessorDTO } from './professor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Professor')
@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async obterProfessores() {
    return this.professorService.acharProfessores();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async obterUmProfessor(@Param('id') id: number) {
    return this.professorService.acharUmProfessor(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async atualizarProfessor(
    @Param('id') id: number,
    @Body() data: UpdateProfessorDTO,
  ) {
    return this.professorService.atualizarProfessor(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async apagarProfessor(@Param('id') id: number) {
    return this.professorService.apagarProfessor(id);
  }
}
