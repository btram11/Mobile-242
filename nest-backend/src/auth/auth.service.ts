import {
  BadRequestException,
  Injectable,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //   async register(registerUserDTO: RegisterUserDTO) {
  //     // check if user already exist
  //     const userFound = await this.userRepo.findOneBy({
  //       email: registerUserDTO.email,
  //     });

  //     if (userFound) {
  //       throw new BadRequestException(`User ${registerUserDTO.email} exist`);
  //     }

  //     const hash = await bcrypt.hash(registerUserDTO.password_hashed, 12);

  //     const user = this.userRepo.create({
  //       email: registerUserDTO.email,
  //       password_hashed: hash,
  //     });
  //     await this.userRepo.save(user);

  //     const { password_hashed, ...safeUser } = user;

  //     return safeUser;
  //   }

  async login(loginUserDTO: LoginUserDTO, @Response() res) {
    const userFound = await this.userService.findUserByEmail(
      loginUserDTO.email,
    );

    if (!userFound) {
      throw new BadRequestException(`Login Failed`);
    }

    const matched = await bcrypt.compare(
      loginUserDTO.password,
      userFound.password_hashed,
    );

    if (!matched) throw new UnauthorizedException('Login Failed');

    const payload = { sub: userFound.user_id, username: userFound.username };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.send({
      status: 200,
      message: 'Login Successfully',
      access_token: accessToken,
      userId: userFound.user_id,
    });
  }

  async logout(@Response() res) {
    res.clearCookie('refresh_token');
    return res.send({
      message: 'Logout Successfully',
    });
  }
}
