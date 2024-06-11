import { NumerologyEntry } from "@entities";
import { NumerologyService } from "./numerology.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NumerolgyController } from "./numerology.controller";

@Module({
    imports: [TypeOrmModule.forFeature([NumerologyEntry])],
    providers: [NumerologyService],
    controllers: [NumerolgyController]
})
export class NumerologyModule {}