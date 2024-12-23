import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmerEntity } from './entities/farmer.entity';
import { Repository } from 'typeorm';
import validator from 'cpf-cnpj-validator';
import { CreateFarmerDto } from './dtos/createFarmer.dto';

@Injectable()
export class FarmerService {

    constructor(
        @InjectRepository(FarmerEntity)
        private readonly farmerRepository: Repository<FarmerEntity>,
    ) {}

    async createFarmer(createFarmer: CreateFarmerDto): Promise<FarmerEntity> {
        try {
            const Joi = require('joi').extend(validator);
            const cpfSchema = Joi.document().cpf();
            const cnpjSchema = Joi.document().cnpj();

            if (createFarmer.cpfCnpj.length === 14) {
                cnpjSchema.validate(createFarmer.cpfCnpj);
            } else if (createFarmer.cpfCnpj.length === 11) {
                cpfSchema.validate(createFarmer.cpfCnpj);
            } else {
                throw new BadRequestException('Invalid CPF/CNPJ');
            }
            
            return await this.farmerRepository.save(createFarmer);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    };

    async listAllFarmers(): Promise<FarmerEntity[]> {
        try {
            return await this.farmerRepository.find();
        } catch (error) {
            throw new Error(error);
        }
    };
}
