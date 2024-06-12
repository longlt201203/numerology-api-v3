import { NumerologyEntry } from "@entities";
import { NumerologyCalculateResultDto, NumerologyEntryDto, ReadNumerologyRequestDto, UpdateNumerologyEntryListDto } from "./dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { NumerologyEntryNotFoundError } from "./errors";

@Injectable()
export class NumerologyService {
    constructor(
        @InjectRepository(NumerologyEntry)
        private readonly numerologyEntryRepo: Repository<NumerologyEntry>
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
        } else {
            entry = this.numerologyEntryRepo.create({
                number: dto.number,
                psychicDescription: dto.psychicDescription,
                destinyDescription: dto.destinyDescription,
                nameDescription: dto.nameDescription
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
            } else {
                entry = this.numerologyEntryRepo.create({
                    number: item.number,
                    psychicDescription: item.psychicDescription,
                    destinyDescription: item.destinyDescription,
                    nameDescription: item.nameDescription
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
        const dob = new Date(dto.dob);
        const lsName = this.lowercaseAndNormalizeString(dto.lsName);
        const firstName = this.lowercaseAndNormalizeString(dto.firstName);
        const fullName = [lsName, firstName].join(" ");

        const psychicNumber = this.calculatePsychicNumber(dob);
        const destinyNumber = this.calculateDestinyNumber(dob);
        const firstNameNumber = this.calculateFirstNameNumber(firstName);
        const fullNameNumber = this.calculateFullNameNumber(fullName);

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

        return {
            psychicNumber: psychicNumber,
            psychicDescription: "psychicEntry.psychicDescription",
            destinyNumber: destinyNumber,
            destinyDescription: "destinyEntry.destinyDescription",
            firstNameNumber: firstNameNumber,
            firstNameDescription: "firstNameEntry.nameDescription",
            fullNameNumber: fullNameNumber,
            fullNameDescription: "fullNameEntry.nameDescription"
        };
    }
}