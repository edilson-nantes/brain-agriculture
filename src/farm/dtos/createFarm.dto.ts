import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateFarmDto {
    @IsString()
    @ApiProperty({ example: 'Farm 1', description: 'The name of the farm' })
    name: string;

    @IsString()
    @ApiProperty({ example: '12345678901', description: 'The CPF or CNPJ of the farmer' })
    city: string;

    @IsString()
    @ApiProperty({ example: 'State 1', description: 'The state of the farm' })
    state: string;

    @IsNumber()
    @ApiProperty({ example: 100, description: 'The total area of the farm in hectares' })
    totalArea: number;

    @IsNumber()
    @ApiProperty({ example: 50, description: 'The arable area of the farm in hectares' })
    arableArea: number;

    @IsNumber()
    @ApiProperty({ example: 50, description: 'The vegetation area of the farm in hectares' })
    vegetationArea: number;
}