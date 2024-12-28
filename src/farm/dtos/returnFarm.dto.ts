import { ReturnHarvestDto } from "../../harvest/dtos/returnHarvest.dto";
import { FarmEntity } from "../entities/farm.entity";

export class ReturnFarmDto {
    id: number;
    name: string;
    city: string;
    state: string;
    totalArea: number;
    arableArea: number;
    vegetationArea: number;
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