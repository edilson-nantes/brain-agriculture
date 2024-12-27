import { IsNumber, IsString } from 'class-validator';

export class CreateHarvestDto {
    @IsString()
    name: string;

    @IsNumber()
    year: number;

    @IsNumber()
    cultivatedArea: number;
}