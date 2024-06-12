import { NumerologyService } from "./numerology.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NumerolgyController } from "./numerology.controller";
import { NumerologyEntry } from "@entities";

@Module({
    imports: [TypeOrmModule.forFeature([NumerologyEntry])],
    providers: [NumerologyService],
    controllers: [NumerolgyController]
})
export class NumerologyModule {}