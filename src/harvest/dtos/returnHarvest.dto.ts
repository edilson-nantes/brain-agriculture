import { CreateHarvestDto } from "./createHarvest.dto";

export class ReturnHarvestDto {
    name: string;
    year: number;
    cultivatedArea: number;

    constructor(harvest: CreateHarvestDto) {
        this.name = harvest.name;
        this.year = harvest.year;
        this.cultivatedArea = harvest.cultivatedArea;
    }
}