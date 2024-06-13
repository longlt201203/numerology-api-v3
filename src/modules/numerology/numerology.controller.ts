import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { NumerologyService } from "./numerology.service";
import { Body, Controller, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CalculateNumerologyYearRequestDto, ImportEntriesDto, NumerologyEntryDto, NumerologyReadingRecordResponseDto, ReadNumerologyRequestDto, UpdateNumerologyEntryListDto } from "./dto";
import { ApiResponseDto } from "@utils";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";

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

    @Get("records")
    async getManyReadingRecords() {
        const data = await this.numerologyService.getManyRecords();
        return new ApiResponseDto(NumerologyReadingRecordResponseDto.fromEntities(data));
    }

    @Get("export-entries-json")
    async exportEntriesJson(@Res() res: Response) {
        const data = await this.numerologyService.exportEntriesJSON();
        res.setHeader("Content-Disposition", `attachment; filename="data.json"`);
        res.setHeader("Content-Type", "application/json");
        res.send(data);
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

    @Post("calculate-year")
    async calculateNumerologyYear(@Body() dto: CalculateNumerologyYearRequestDto) {
        const data = await this.numerologyService.calculateNumerologyYear(dto);
        return new ApiResponseDto(data);
    }

    @Post("import-entries")
    @ApiConsumes("multipart/form-data")
    @ApiBody({ type: ImportEntriesDto })
    @UseInterceptors(FileInterceptor("file"))
    async importEntries(@UploadedFile() file: Express.Multer.File) {
        await this.numerologyService.importEntries(file);
        return new ApiResponseDto(null, null, "Import entries successfully!");
    }
}