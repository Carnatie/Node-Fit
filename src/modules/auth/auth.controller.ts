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
import { CreateAlunoDTO, CreateProfessorDTO } from './auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Role } from './enums/role.enum';
import { Roles } from './decorators/roles.decorator';
import { RateLimit } from './decorators/rate-limit.decorator';

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
  @RateLimit(10)
  login(@Request() req) {
    return this.authProfessorService.login(req.body.email);
  }

  @Post('registrarProfessor')
  @Public()
  async registrarProfessor(@Body() data: CreateProfessorDTO) {
    return this.authProfessorService.registrarProfessor(data);
  }

  @Post('professor/registrarAluno')
  @Roles(Role.Professor)
  @UseGuards(JwtAuthGuard)
  async registrarAluno(@Body() data: CreateAlunoDTO, @Request() req) {
    return this.authAlunoService.registrarAluno(data, req.user.id);
  }
}
