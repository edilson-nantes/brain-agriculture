import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FarmEntity } from './entities/farm.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFarmDto } from './dtos/createFarm.dto';
import { FarmerService } from 'src/farmer/farmer.service';
import { FarmAreaValidator } from './validators/farmArea.validator';

@Injectable()
export class FarmService {
    private readonly logger = new Logger(FarmService.name);

    constructor(
        @InjectRepository(FarmEntity)
        private readonly farmRepository: Repository<FarmEntity>,
        private readonly farmerService: FarmerService,
    ) {};

    async createFarm(farmerId: number, createFarmDto: CreateFarmDto): Promise<FarmEntity> {
        this.logger.log('Creating a new farm');
        
        await this.farmerService.getFarmerById(farmerId);
        
        FarmAreaValidator.validateFarmArea(createFarmDto.arableArea, createFarmDto.vegetationArea, createFarmDto.totalArea);
        
        return this.farmRepository.save({
            ...createFarmDto,
            farmerId: farmerId,
        });
    }

    async listAllFarms(): Promise<FarmEntity[]> {
        this.logger.log('Listing all farms');
        return await this.farmRepository.find();
    }

    async getFarmById(farmId: number): Promise<FarmEntity> {
        this.logger.log(`Fetching farm with ID: ${farmId}`);
        
        const farm = await this.farmRepository.findOne({
            where: {
                id: farmId
            },
            relations: ['harvests']
        });

        if (!farm) {
            this.logger.warn(`Farm with ID: ${farmId} not found`);
            throw new NotFoundException('Farm not found');
        }

        return farm;
    }

    async getFarmByFarmerId(farmerId: number): Promise<FarmEntity[]> {
        this.logger.log(`Fetching farms from farmer with ID: ${farmerId}`);

        const farms = await this.farmRepository.find({
            where: {
                farmerId: farmerId
            }
        });

        if (!farms) {
            this.logger.warn(`Farms from farmer with ID: ${farmerId} not found`);
            throw new NotFoundException('Farms not found');
        }

        return farms;
    }

    async updateFarm(farmId: number, updateFarm: CreateFarmDto): Promise<FarmEntity> {
        this.logger.log(`Updating farm with ID: ${farmId}`);
        
        const farm = await this.farmRepository.findOne({
            where: {
                id: farmId
            }
        });

        if (!farm) {
            this.logger.warn(`Farm with ID: ${farmId} not found`);
            throw new NotFoundException('Farm not found');
        }

        FarmAreaValidator.validateFarmArea(updateFarm.arableArea, updateFarm.vegetationArea, updateFarm.totalArea);

        return this.farmRepository.save({
            ...farm,
            ...updateFarm
        });
    }

    async deleteFarm(farmId: number): Promise<void> {
        this.logger.log(`Deleting farm with ID: ${farmId}`);
        
        const farm = await this.farmRepository.findOne({
            where: {
                id: farmId
            }
        });

        if (!farm) {
            this.logger.warn(`Farm with ID: ${farmId} not found`);
            throw new NotFoundException('Farm not found');
        }

        await this.farmRepository.delete(farmId);
        this.logger.log(`Farm with ID: ${farmId} deleted`);
    }
}
