import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //   @Post('register')
  //   register(@Body() registerUserDTO: RegisterUserDTO) {
  //     return this.authService.register(registerUserDTO);
  //   }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginUserDTO: LoginUserDTO) {
    return this.authService.login(loginUserDTO);
  }
}
