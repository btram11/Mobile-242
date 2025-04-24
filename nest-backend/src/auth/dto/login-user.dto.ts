import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class LoginUserDTO {
  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;
}

export class LoginResponseDTO {
  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  userId: string;
  s;
}
