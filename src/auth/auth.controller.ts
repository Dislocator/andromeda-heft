import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDTO, RegisterDTO } from 'src/models/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body(ValidationPipe) credentials: RegisterDTO) {
    return this.authService.register(credentials);
  }

  @Post('/login')
  login(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    credentials: LoginDTO,
  ) {
    return this.authService.login(credentials);
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {
    return HttpStatus.OK
  }

  @Get("/facebook/redirect")
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request) {
    return {
      status: HttpStatus.OK,
      data: req.user
    }
  }
}
