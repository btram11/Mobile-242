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
import { LoginResponseDTO, LoginUserDTO } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { LogoutResponseDTO } from './dto/logout-user.dto';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //   @Post('register')
  //   register(@Body() registerUserDTO: RegisterUserDTO) {
  //     return this.authService.register(registerUserDTO);
  //   }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({
    status: 200,
    description:
      'Login successfully, returning access token and refresh token.',
    type: LoginResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid email or password.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid login credentials.',
  })
  async login(@Body() loginUserDTO: LoginUserDTO, @Res() res: Response) {
    const result = await this.authService.login(loginUserDTO, res);
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @ApiResponse({
    status: 200,
    description: 'Logout successfully, clearing refresh token.',
    type: LogoutResponseDTO,
  })
  @UseGuards(AuthGuard)
  async logout(@Res() res: Response) {
    const result = this.authService.logout(res);
    return result;
  }
}
