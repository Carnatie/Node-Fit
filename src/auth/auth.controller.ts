import { Controller, UseGuards, Post, HttpCode, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpStatus } from '@nestjs/common/enums';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/is-public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Request() req) {
    return this.authService.login(req.body.email);
  }
}
