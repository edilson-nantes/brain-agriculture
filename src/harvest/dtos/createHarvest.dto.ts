import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateHarvestDto {
    @IsString()
    @ApiProperty({ example: 'Corn', description: 'The name of the harvest' })
    name: string;

    @IsNumber()
    @ApiProperty({ example: 2021, description: 'The year of the harvest' })
    year: number;

    @IsNumber()
    @ApiProperty({ example: 50, description: 'The cultivated area of the harvest in hectares' })
    cultivatedArea: number;
}