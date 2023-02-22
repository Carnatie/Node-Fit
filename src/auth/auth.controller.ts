import { Controller, UseGuards, Post, HttpCode, Request } from '@nestjs/common';
import { AuthService } from './authProfessor.service';
import { HttpStatus } from '@nestjs/common/enums';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/is-public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('professor/login')
  @Public()
  @ApiBearerAuth()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Request() req) {
    return this.authService.login(req.body.email);
  }
}
