import { ApiProperty } from "@nestjs/swagger";
import { ReturnHarvestDto } from "../../harvest/dtos/returnHarvest.dto";
import { FarmEntity } from "../entities/farm.entity";

export class ReturnFarmDto {
    @ApiProperty({ example: 1, description: 'The ID of the farm' })
    id: number;

    @ApiProperty({ example: 'Farm 1', description: 'The name of the farm' })
    name: string;

    @ApiProperty({ example: 'City 1', description: 'The city of the farm' })
    city: string;

    @ApiProperty({ example: 'State 1', description: 'The state of the farm' })
    state: string;

    @ApiProperty({ example: 100, description: 'The total area of the farm in hectares' })
    totalArea: number;

    @ApiProperty({ example: 50, description: 'The arable area of the farm in hectares' })
    arableArea: number;

    @ApiProperty({ example: 50, description: 'The vegetation area of the farm in hectares' })
    vegetationArea: number;

    @ApiProperty({ type: [ReturnHarvestDto], description: 'The harvests of the farm' })
    harvests?: ReturnHarvestDto[];

    constructor(farm: FarmEntity) {
        this.id = farm.id;
        this.name = farm.name;
        this.city = farm.city;
        this.state = farm.state;
        this.totalArea = farm.totalArea;
        this.arableArea = farm.arableArea;
        this.vegetationArea = farm.vegetationArea;
        this.harvests = farm.harvests?.map(harvest => new ReturnHarvestDto(harvest));
    }
}