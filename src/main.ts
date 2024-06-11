import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from '@utils';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Numerology')
    .setDescription('The Numerology API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);


  await app.listen(Env.LISTEN_PORT);
}
bootstrap();
