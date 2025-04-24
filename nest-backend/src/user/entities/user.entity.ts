import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column({ nullable: true })
  user_img_url?: String;

  @Column()
  password_hashed: String;

  @Column({ unique: true })
  email: String;

  @Column({ nullable: true })
  faculty?: String;

  @Column({ nullable: true, length: 20 })
  phone_number?: String;

  @Column({ default: '' })
  salt: String;

  @CreateDateColumn({
    type: 'time',
    default: () => {
      'CURRENT_TIMESTAMP';
    },
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'time',
    default: () => {
      'CURRENT_TIMESTAMP';
    },
  })
  updated_at: Date;
}
