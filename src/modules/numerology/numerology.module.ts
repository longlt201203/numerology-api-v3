import { NumerologyService } from "./numerology.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NumerolgyController } from "./numerology.controller";
import { NumerologyEntry, NumerologyReadingRecord } from "@entities";
import { MulterModule } from "@nestjs/platform-express";
import { multerStorage } from "@utils";

@Module({
    imports: [TypeOrmModule.forFeature([NumerologyEntry, NumerologyReadingRecord]), MulterModule.register({ storage: multerStorage })],
    providers: [NumerologyService],
    controllers: [NumerolgyController]
})
export class NumerologyModule {}