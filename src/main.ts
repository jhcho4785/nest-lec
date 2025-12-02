import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { json, urlencoded } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import process from 'process';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const expressApp = express();
  expressApp.set('case sensitive routing', true);

  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), { bufferLogs: true });

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  //enable cors
  app.enableCors({
    origin: true,
    credentials: true,
  });

  //use winston logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  //validate
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  //swagger config
  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('Arumnuri API List')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);

  //cookie and session
  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET as unknown as string,
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      },
    }),
  );

  const adapter = new ExpressAdapter();
  adapter.set('trust proxy', true);

  //passport
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
