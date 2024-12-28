import { FarmerEntity } from '../entities/farmer.entity';
import { ReturnFarmDto } from '../../farm/dtos/returnFarm.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnFarmerDto {
    @ApiProperty({ example: 1, description: 'The ID of the farmer' })
    id: number;

    @ApiProperty({ example: '12345678901', description: 'The CPF or CNPJ of the farmer' })
    cpfCnpj: string;

    @ApiProperty({ example: 'Joe', description: 'The name of the farmer' })
    name: string;

    @ApiProperty({ type: [ReturnFarmDto], description: 'The farms of the farmer' })
    farms?: ReturnFarmDto[];

    constructor(farmer: FarmerEntity) {
        this.id = farmer.id;
        this.cpfCnpj = farmer.cpfCnpj;
        this.name = farmer.name;
        this.farms = farmer.farms?.map(farm => new ReturnFarmDto(farm));
    }
}