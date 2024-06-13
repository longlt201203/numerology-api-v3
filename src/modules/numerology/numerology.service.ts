import { NumerologyEntry, NumerologyReadingRecord } from "@entities";
import { CalculateNumerologyYearRequestDto, CalculateNumerologyYearResultDto, NumerologyCalculateResultDto, NumerologyEntryDto, ReadNumerologyRequestDto, UpdateNumerologyEntryListDto } from "./dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { NumerologyEntryNotFoundError } from "./errors";

@Injectable()
export class NumerologyService {
    constructor(
        @InjectRepository(NumerologyEntry)
        private readonly numerologyEntryRepo: Repository<NumerologyEntry>,
        @InjectRepository(NumerologyReadingRecord)
        private readonly numerologyReadingRecordRepo: Repository<NumerologyReadingRecord>
    ) { }
    private readonly charMap = {
        a: 1, i: 1, j: 1, q: 1, y: 1,
        b: 2, k: 2, r: 2,
        g: 3, l: 3, s: 3,
        d: 4, m: 4, t: 4,
        e: 5, n: 5,
        u: 6, v: 6, w: 6, x: 6,
        o: 7, z: 7,
        f: 8, h: 8, p: 8
    } as const;

    getMany() {
        return this.numerologyEntryRepo.find({ order: { number: "ASC" } });
    }

    getManyRecords() {
        return this.numerologyReadingRecordRepo.find();
    }

    async getOneByNumber(number: number) {
        const entry = await this.numerologyEntryRepo.findOne({ where: { number: number } });
        if (!entry) throw new NumerologyEntryNotFoundError();
        return entry;
    }

    async updateOrCreateNumerologyEntry(dto: NumerologyEntryDto) {
        let entry = await this.numerologyEntryRepo.findOne({ where: { number: dto.number } });
        if (entry) {
            entry.psychicDescription = dto.psychicDescription;
            entry.destinyDescription = dto.destinyDescription;
            entry.nameDescription = dto.nameDescription;
            entry.yearDescription = dto.yearDescription;
        } else {
            entry = this.numerologyEntryRepo.create({
                number: dto.number,
                psychicDescription: dto.psychicDescription,
                destinyDescription: dto.destinyDescription,
                nameDescription: dto.nameDescription,
                yearDescription: dto.yearDescription
            });
        }
        return await this.numerologyEntryRepo.save(entry);
    }

    async updateNumerologyEntryList(dto: UpdateNumerologyEntryListDto) {
        const entries = await this.numerologyEntryRepo.find({ where: { number: In(dto.data.map(item => item.number)) } });
        const newList: NumerologyEntry[] = [];
        for (const item of dto.data) {
            let entry = entries.find(e => e.number == item.number);
            if (entry) {
                entry.psychicDescription = item.psychicDescription;
                entry.destinyDescription = item.destinyDescription;
                entry.nameDescription = item.nameDescription;
                entry.yearDescription = item.yearDescription;
            } else {
                entry = this.numerologyEntryRepo.create({
                    number: item.number,
                    psychicDescription: item.psychicDescription,
                    destinyDescription: item.destinyDescription,
                    nameDescription: item.nameDescription,
                    yearDescription: item.yearDescription
                });
            }
            newList.push(entry);
        }
        return await this.numerologyEntryRepo.save(newList);
    }

    calculatePsychicNumber(dob: Date) {
        return this.recursionDigitSum(dob.getDate());
    }

    calculateDestinyNumber(dob: Date) {
        const daySum = this.recursionDigitSum(dob.getDate());
        const monthSum = this.recursionDigitSum(dob.getMonth() + 1);
        const yearSum = this.recursionDigitSum(dob.getFullYear());
        return this.recursionDigitSum(daySum + monthSum + yearSum);
    }

    calculateFirstNameNumber(firstName: string) {
        let sum = 0;
        for (const char of firstName) {
            if (this.charMap[char]) sum += this.charMap[char];
        }
        return this.recursionDigitSum(sum);
    }

    calculateFullNameNumber(fullName: string) {
        let sum = 0;
        for (const char of fullName) {
            if (this.charMap[char]) sum += this.charMap[char];
        }
        return this.recursionDigitSum(sum);
    }

    recursionDigitSum(n: number): number {
        let s = Array.from(n.toString(), (item) => parseInt(item));
        const sum = s.reduce((prev, curr) => prev + curr);
        return sum < 10 ? sum : this.recursionDigitSum(sum);
    }

    lowercaseAndNormalizeString(str: string) {
        return str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/Đ/g, 'D')
            .replace(/đ/g, 'd');
    }

    async readNumerology(dto: ReadNumerologyRequestDto): Promise<NumerologyCalculateResultDto> {
        //#region Pre-processing data
        const dob = new Date(dto.dob);
        const lsName = this.lowercaseAndNormalizeString(dto.lsName);
        const firstName = this.lowercaseAndNormalizeString(dto.firstName);
        let psychicNumber = 0;
        let destinyNumber = 0;
        let firstNameNumber = 0;
        let fullNameNumber = 0;
        //#endregion

        // Find record by user info
        const record = await this.numerologyReadingRecordRepo.findOne({ where: { firstName, lsName, dob } });
        if (record) {
            //#region Re-use the existed record
            psychicNumber = record.psychicNumber;
            destinyNumber = record.destinyNumber;
            firstNameNumber = record.firstNameNumber;
            fullNameNumber = record.fullNameNumber;
            //#endregion
        } else {
            //#region Calculate numbers
            const fullName = [lsName, firstName].join(" ");

            psychicNumber = this.calculatePsychicNumber(dob);
            destinyNumber = this.calculateDestinyNumber(dob);
            firstNameNumber = this.calculateFirstNameNumber(firstName);
            fullNameNumber = this.calculateFullNameNumber(fullName);
            //#endregion

            //#region Save the record for later uses
            this.numerologyReadingRecordRepo.save({
                firstName: dto.firstName,
                lsName: dto.lsName,
                dob: dob,
                psychicNumber: psychicNumber,
                destinyNumber: destinyNumber,
                firstNameNumber: firstNameNumber,
                fullNameNumber: fullNameNumber
            });
            //#endregion
        }

        //#region Find the corresponding descriptions of the numbers
        const [
            psychicEntry,
            destinyEntry,
            firstNameEntry,
            fullNameEntry
        ] = await Promise.all([
            this.numerologyEntryRepo.findOne({ where: { number: psychicNumber } }),
            this.numerologyEntryRepo.findOne({ where: { number: destinyNumber } }),
            this.numerologyEntryRepo.findOne({ where: { number: firstNameNumber } }),
            this.numerologyEntryRepo.findOne({ where: { number: fullNameNumber } })
        ]);
        //#endregion

        return {
            psychicNumber: psychicNumber,
            psychicDescription: psychicEntry.psychicDescription,
            destinyNumber: destinyNumber,
            destinyDescription: destinyEntry.destinyDescription,
            firstNameNumber: firstNameNumber,
            firstNameDescription: firstNameEntry.nameDescription,
            fullNameNumber: fullNameNumber,
            fullNameDescription: fullNameEntry.nameDescription
        };
    }

    async exportEntriesJSON() {
        const entries = await this.numerologyEntryRepo.find();
        return JSON.stringify(entries);
    }

    async calculateNumerologyYear(dto: CalculateNumerologyYearRequestDto): Promise<CalculateNumerologyYearResultDto> {
        const dob = new Date(dto.dob);
        const newDob = new Date(dto.year, dob.getMonth(), dob.getDate());
        const date = dob.getDate();
        const month = dob.getMonth()+1;
        const yearStr = dto.year.toString();
        let yearLast2DigitsNumber = parseInt(yearStr.slice(yearStr.length-2, yearStr.length));
        const dow = newDob.getDay()+1;
        const yearNumber = this.recursionDigitSum(date+month+yearLast2DigitsNumber+dow);
        const entry = await this.numerologyEntryRepo.findOne({ where: { number: yearNumber } });
        return {
            yearNumber: yearNumber,
            yearDescription: entry.yearDescription
        }
    }
}