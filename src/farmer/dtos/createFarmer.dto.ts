import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFarmerDto {
    @IsString()
    @ApiProperty({ example: '12345678901', description: 'The CPF or CNPJ of the farmer' })
    cpfCnpj: string;

    @IsString()
    @ApiProperty({ example: 'Joe', description: 'The name of the farmer' })
    name: string;
}