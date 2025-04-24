import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //   @Post('register')
  //   register(@Body() registerUserDTO: RegisterUserDTO) {
  //     return this.authService.register(registerUserDTO);
  //   }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO, @Res() res: Response) {
    const result = await this.authService.login(loginUserDTO, res);
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Res() res: Response) {
    const result = this.authService.logout(res);
    return result;
  }
}
