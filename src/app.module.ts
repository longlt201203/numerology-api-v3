import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { MyExceptionFilter, ValidationPipe } from '@utils';
import { NumerologyModule } from '@modules/numerology';

@Module({
  imports: [DbModule, NumerologyModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule {}
