import { ApiTags } from "@nestjs/swagger";
import { NumerologyService } from "./numerology.service";
import { Controller } from "@nestjs/common";

@Controller("numerology")
@ApiTags("Numerology")
export class NumerolgyController {
    constructor(
        private readonly numerologyService: NumerologyService
    ) {}
}