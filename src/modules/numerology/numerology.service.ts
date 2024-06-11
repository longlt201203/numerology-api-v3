import { NumerologyEntry } from "@entities";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class NumerologyService {
    constructor(
        private readonly numerologyEntryRepo: Repository<NumerologyEntry>
    ) {}
}