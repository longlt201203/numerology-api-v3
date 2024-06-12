import { ApiTags } from "@nestjs/swagger";
import { NumerologyService } from "./numerology.service";
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { NumerologyEntryDto, ReadNumerologyRequestDto, UpdateNumerologyEntryListDto } from "./dto";
import { ApiResponseDto } from "@utils";

@Controller("numerology")
@ApiTags("Numerology")
export class NumerolgyController {
    constructor(
        private readonly numerologyService: NumerologyService
    ) {}

    @Get()
    async getMany() {
        const data = await this.numerologyService.getMany();
        return new ApiResponseDto(NumerologyEntryDto.fromEntities(data));
    }

    @Get(":number")
    async getOneByNumber(@Param("number") number: string) {
        const data = await this.numerologyService.getOneByNumber(+number);
        return new ApiResponseDto(NumerologyEntryDto.fromEntity(data));
    }

    @Put("update-or-create-entry")
    async updateOrCreateNumerologyEntry(@Body() dto: NumerologyEntryDto) {
        const data = await this.numerologyService.updateOrCreateNumerologyEntry(dto);
        return new ApiResponseDto(NumerologyEntryDto.fromEntity(data));
    }

    @Put("update-numerology-entry-list")
    async updateNumerologyEntryList(@Body() dto: UpdateNumerologyEntryListDto) {
        const data = await this.numerologyService.updateNumerologyEntryList(dto);
        return new ApiResponseDto(NumerologyEntryDto.fromEntities(data));
    }

    @Post("read")
    async readNumerology(@Body() dto: ReadNumerologyRequestDto) {
        const data = await this.numerologyService.readNumerology(dto);
        return new ApiResponseDto(data);
    }
}