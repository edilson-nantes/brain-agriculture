import { FarmerEntity } from '../entities/farmer.entity';
import { ReturnFarmDto } from 'src/farm/dtos/returnFarm.dto';

export class ReturnFarmerDto {
    id: number;
    cpfCnpj: string;
    name: string;
    farms?: ReturnFarmDto[];

    constructor(farmer: FarmerEntity) {
        this.id = farmer.id;
        this.cpfCnpj = farmer.cpfCnpj;
        this.name = farmer.name;
        this.farms = farmer.farms?.map(farm => new ReturnFarmDto(farm));
    }
}