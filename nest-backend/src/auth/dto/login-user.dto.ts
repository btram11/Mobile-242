import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class LoginUserDTO {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
