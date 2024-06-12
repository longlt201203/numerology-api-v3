import { NumerologyEntry } from "@entities";
import { NumerologyEntryDto, ReadingNumerologyRequestDto, UpdateNumerologyEntryListDto } from "./dto";
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
        
    }

    calculateDestinyNumber(dob: Date) {

    }

    calculateFirstNameNumber(firstName: string) {

    }

    calculateFullNameNumber(fullName: string) {

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

    readingNumerology(dto: ReadingNumerologyRequestDto) {
        const lsName = this.lowercaseAndNormalizeString(dto.lsName);
        const firstName = this.lowercaseAndNormalizeString(dto.firstName);
        const fullName = [lsName, firstName].join(" ");
    }
}