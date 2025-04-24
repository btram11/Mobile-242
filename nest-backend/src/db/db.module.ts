import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { AuthController } from 'src/auth/auth.controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get<string>('DB_HOST'),
        port: cfg.get<number>('DB_PORT'),
        username: cfg.get<string>('DB_USERNAME'),
        password: cfg.get<string>('DB_PASSWORD'),
        database: cfg.get<string>('DB_NAME'),
        entities: [__dirname + '/../**/*.entities{.ts,.js}'],
        synchronize: false,
        migrations: ['dist/migrations/*.{ts,js}'],
        ssl: cfg.get<string>('DB_SSL') === 'true',
      }),
    }),
  ],
  providers: [AuthService, UserService],
  exports: [AuthController],
})
export class DbModule {
  // static register(): DynamicModule {
  //   return {
  //     module: DbModule,
  //     global: true,
  //   };
  // }
}
