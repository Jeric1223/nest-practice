/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect('https://localhost:3000', 301)
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req.user);
  }
}
