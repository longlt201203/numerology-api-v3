import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from '@utils';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: "*" });
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Numerology')
    .setDescription('The Numerology API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(helmet());
  await app.listen(Env.LISTEN_PORT);
}
bootstrap();
