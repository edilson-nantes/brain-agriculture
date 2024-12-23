import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateFarmDto {
    @IsString()
    name: string;

    @IsInt()
    cityId: number;

    @IsInt()
    stateId: number;

    @IsNumber()
    totalArea: number;

    @IsNumber()
    arableArea: number;

    @IsNumber()
    vegetationArea: number;
}