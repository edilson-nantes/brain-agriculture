import { IsNumber, IsString } from 'class-validator';

export class CreateFarmDto {
    @IsString()
    name: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsNumber()
    totalArea: number;

    @IsNumber()
    arableArea: number;

    @IsNumber()
    vegetationArea: number;
}