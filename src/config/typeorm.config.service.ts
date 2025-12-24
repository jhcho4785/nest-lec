import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from '@/entities/user.entity';
import { Customer } from '@/entities/customer.entity';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT') ?? 3306,
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASS'),
      database: this.configService.get<string>('DB_NAME'),
      logging: this.configService.get<string>('NODE_ENV') === 'development',
      charset: 'utf8mb4_general_ci',
      dateStrings: true,
      namingStrategy: new SnakeNamingStrategy(), //camel -> snake
      synchronize: false,
      poolSize: 10,
      entities: [User, Customer],
    };
  }
}
