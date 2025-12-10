import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import process from 'process';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Transport from 'winston-transport';
import winston from 'winston';
import { utilities, WinstonModule } from 'nest-winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from '@/config/typeorm.config.service';
import { UserModule } from './user/user.module';

function getWinstonTransports() {
  const transports: Transport[] = [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
      format:
        process.env.NODE_ENV === 'development'
          ? winston.format.combine(
              winston.format.timestamp(),
              winston.format.ms(),
              utilities.format.nestLike('ARUMNURI', {
                colors: true,
                prettyPrint: true,
              }),
            )
          : winston.format.simple(),
    }),
  ];

  return transports;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env'
          : process.env.NODE_ENV === 'test'
            ? '.test.env'
            : '.development.env',
    }),
    WinstonModule.forRoot({
      transports: getWinstonTransports(),
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeormConfigService }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
