import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmerEntity } from './entities/farmer.entity';
import { Repository } from 'typeorm';
import { CreateFarmerDto } from './dtos/createFarmer.dto';
import { CpfCnpjValidator } from './validators/cpf-cnpj.validator';

@Injectable()
export class FarmerService {
    private readonly logger = new Logger(FarmerService.name);

    constructor(
        @InjectRepository(FarmerEntity)
        private readonly farmerRepository: Repository<FarmerEntity>,
    ) {}

    async createFarmer(createFarmer: CreateFarmerDto): Promise<FarmerEntity> {
        this.logger.log('Creating a new farmer');

        CpfCnpjValidator.validate(createFarmer.cpfCnpj);
        return await this.farmerRepository.save(createFarmer);
    }

    async listAllFarmers(): Promise<FarmerEntity[]> {
        this.logger.log('Listing all farmers');
        return await this.farmerRepository.find();
    }

    async getFarmerById(id: number): Promise<FarmerEntity> {
        this.logger.log(`Fetching farmer with ID: ${id}`);

        const farmer = await this.farmerRepository.findOne({
            where: {
                id: id
            },
            relations: ['farms']
        });
        if (!farmer) {
            this.logger.warn(`Farmer with ID: ${id} not found`);
            throw new NotFoundException('Farmer not found');
        }
        return farmer;
    }

    async getFarmerByCpfCnpj(cpfCnpj: string): Promise<FarmerEntity> {
        this.logger.log(`Fetching farmer with CPF/CNPJ: ${cpfCnpj}`);

        const farmer = await this.farmerRepository.findOne({
            where: {
                cpfCnpj: cpfCnpj
            },
            relations: ['farms']
        });

        if (!farmer) {
            this.logger.warn(`Farmer with CPF/CNPJ: ${cpfCnpj} not found`);
            throw new NotFoundException('Farmer not found');
        }
        
        return farmer;
    }

    async updateFarmer(id: number, updateFarmer: CreateFarmerDto): Promise<FarmerEntity> {
        this.logger.log(`Updating farmer with ID: ${id}`);

        const farmer = await this.farmerRepository.findOne({
            where: {
                id: id
            }
        });

        if (!farmer) {
            this.logger.warn(`Farmer with ID: ${id} not found`);
            throw new NotFoundException('Farmer not found');
        }

        farmer.cpfCnpj ? CpfCnpjValidator.validate(updateFarmer.cpfCnpj) : null;

        return await this.farmerRepository.save({
            ...farmer,
            ...updateFarmer
        });
    }

    async deleteFarmer(id: number): Promise<void> {
        this.logger.log(`Deleting farmer with ID: ${id}`);

        const farmer = await this.farmerRepository.findOne({
            where: {
                id: id
            }
        });

        if (!farmer) {
            this.logger.warn(`Farmer with ID: ${id} not found`);
            throw new NotFoundException('Farmer not found');
        }


        await this.farmerRepository.delete(farmer.id);
        this.logger.log(`Farmer with ID: ${id} deleted`);
    }
}
