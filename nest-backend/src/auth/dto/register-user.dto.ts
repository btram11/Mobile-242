import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class RegisterUserDTO {
  @Column({ unique: true, length: 50 })
  username: string;

  @Column({ nullable: true })
  user_img_url?: String;

  @Column()
  password: String;

  @Column({ unique: true })
  email: String;

  @Column({ nullable: true })
  faculty?: String;

  @Column({ nullable: true, length: 20 })
  phone_number?: String;
}
