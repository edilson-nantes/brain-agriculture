import { IsString } from 'class-validator';

export class CreateFarmerDto {
    @IsString()
    cpfCnpj: string;

    @IsString()
    name: string;
}