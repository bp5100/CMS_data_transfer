import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  appendIdToRequest,
  appendRequestIdToLogger,
  LoggingInterceptor,
  morganRequestLogger,
  morganResponseLogger,
} from 'nestjs-winston-logger';
import { ResponseTransformInterceptor } from './core/http/interceptors/response-transform.interceptor';
import { globalLogger } from './config/globalLogger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { bufferLogs: true });
  //
  // await app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: {
  //     port: 3002,
  //   },
  // });
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters();
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  // await app.startAllMicroservices();

  // // winston logger config
  app.useLogger(globalLogger);
  //
  // // append id to identify request
  // app.use(appendIdToRequest);
  // app.use(appendRequestIdToLogger(globalLogger));
  // app.use(morganRequestLogger(globalLogger));
  // app.use(morganResponseLogger(globalLogger));
  app.useGlobalInterceptors(new LoggingInterceptor(globalLogger));

  if (process.env.APP_ENV !== 'production') {
    app.use(
      ['/api-doc', '/api-doc/*'],
      basicAuth({
        challenge: true,
        users: {
          [`${process.env.SWAGGER_USER}`]: process.env.SWAGGER_PASSWORD,
        },
      }),
    );
    const options = new DocumentBuilder()
      .setTitle('Biruwa Nepal')
      .setDescription('The documentation for API for Biruwa CMS')
      .setVersion('1.0')
      .addTag('biruwa')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    const customOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: 'base OKR Docs',
    };
    SwaggerModule.setup('api-doc', app, document, customOptions);
  }

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.enableShutdownHooks();

  // app.use(helmet());
  await app.listen(process.env.APP_PORT || '3002', () => {
    console.log(`App running at port ${process.env.APP_PORT || '3002'}`);
  });
}
bootstrap().then((r) => console.log('app started'));
