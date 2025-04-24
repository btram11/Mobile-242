import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class LoginUserDTO {
  @Column({ unique: true })
  email: String;

  @Column()
  password: String;
}
