import {
  Controller,
  Post,
  HttpCode,
  Request,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthProfessorService } from './authProfessor.service';
import { AuthAlunoService } from './authAluno.service';
import { HttpStatus } from '@nestjs/common/enums';
import { Public } from './decorators/is-public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAlunoDTO } from './auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authProfessorService: AuthProfessorService,
    private readonly authAlunoService: AuthAlunoService,
  ) {}

  @Post('professor/login')
  @Public()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  login(@Request() req) {
    return this.authProfessorService.login(req.body.email);
  }

  @Post('professor/registrarAluno')
  @UseGuards(JwtAuthGuard)
  async registrarAluno(@Body() data: CreateAlunoDTO, @Request() req) {
    return this.authAlunoService.registrarAluno(data, req.user.id);
  }
}
