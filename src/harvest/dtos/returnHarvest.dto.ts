import { ApiProperty } from "@nestjs/swagger";
import { CreateHarvestDto } from "./createHarvest.dto";

export class ReturnHarvestDto {
    @ApiProperty({ example: 'Corn', description: 'The name of the harvest' })
    name: string;

    @ApiProperty({ example: 2021, description: 'The year of the harvest' })
    year: number;

    @ApiProperty({ example: 50, description: 'The cultivated area of the harvest in hectares' })
    cultivatedArea: number;

    constructor(harvest: CreateHarvestDto) {
        this.name = harvest.name;
        this.year = harvest.year;
        this.cultivatedArea = harvest.cultivatedArea;
    }
}