import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmerEntity } from './entities/farmer.entity';
import { Repository } from 'typeorm';
import { CreateFarmerDto } from './dtos/createFarmer.dto';
import { CpfCnpjValidator } from './validators/cpf-cnpj.validator';

@Injectable()
export class FarmerService {

    constructor(
        @InjectRepository(FarmerEntity)
        private readonly farmerRepository: Repository<FarmerEntity>,
    ) {}

    async createFarmer(createFarmer: CreateFarmerDto): Promise<FarmerEntity> {
        CpfCnpjValidator.validate(createFarmer.cpfCnpj);
        
        return await this.farmerRepository.save(createFarmer);
    }

    async listAllFarmers(): Promise<FarmerEntity[]> {
        return await this.farmerRepository.find();
    }

    async getFarmerById(id: number): Promise<FarmerEntity> {
        const farmer = await this.farmerRepository.findOne({
            where: {
                id: id
            },
            relations: ['farms']
        });
        if (!farmer) {
            throw new NotFoundException('Farmer not found');
        }
        return farmer;
    }

    async getFarmerByCpfCnpj(cpfCnpj: string): Promise<FarmerEntity> {
        
        const farmer = await this.farmerRepository.findOne({
            where: {
                cpfCnpj: cpfCnpj
            },
            relations: ['farms']
        });

        if (!farmer) {
            throw new NotFoundException('Farmer not found');
        }
        
        return farmer;
    }

    async updateFarmer(id: number, updateFarmer: CreateFarmerDto): Promise<FarmerEntity> {
        const farmer = await this.farmerRepository.findOne({
            where: {
                id: id
            }
        });

        if (!farmer) {
            throw new NotFoundException('Farmer not found');
        }

        return await this.farmerRepository.save({
            ...farmer,
            ...updateFarmer
        });
    }

    async deleteFarmer(id: number): Promise<void> {
        const farmer = await this.farmerRepository.findOne({
            where: {
                id: id
            }
        });

        if (!farmer) {
            throw new NotFoundException('Farmer not found');
        }

        await this.farmerRepository.delete(farmer.id);
    }
}
