import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MyExceptionFilter, NumerologyClsStore, ValidationPipe } from '@utils';
import { NumerologyModule } from '@modules/numerology';
import { AccountsModule } from '@modules/accounts';
import { AuthGuard, AuthModule } from '@modules/auth';
import { ClsModule, ClsService } from 'nestjs-cls';
import { CryptoModule } from '@modules/crypto';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: (cls: ClsService<NumerologyClsStore>) => {
          cls.set("profile", null);
        }
      }
    }),
    DbModule,
    NumerologyModule,
    CryptoModule,
    AccountsModule,
    AuthModule
  ],
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
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
