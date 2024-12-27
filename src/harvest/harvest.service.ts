import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HarvestEntity } from './entities/harvest.entity';
import { Repository } from 'typeorm';
import { CreateHarvestDto } from './dtos/createHarvest.dto';
import { FarmService } from 'src/farm/farm.service';
import { HarvestAreaValidator } from './validators/harvestArea.validator';

@Injectable()
export class HarvestService {
    private readonly logger = new Logger(HarvestService.name);

    constructor(
        @InjectRepository(HarvestEntity)
        private readonly harvestRepository: Repository<HarvestEntity>,
        private readonly farmService: FarmService,
    ) {}

    async createHarvest(farmId: number, createHarvestDto: CreateHarvestDto): Promise<HarvestEntity> {
        this.logger.log('Creating a new harvest');
        
        const farm = await this.farmService.getFarmById(farmId);
        
        HarvestAreaValidator.validateHarvestArea(createHarvestDto.cultivatedArea, farm.arableArea);

        return await this.harvestRepository.save({
            ...createHarvestDto,
            farmId: farmId,
        });
    }

    async listAllHarvests(): Promise<HarvestEntity[]> {
        this.logger.log('Listing all harvests');
        
        return await this.harvestRepository.find();
    }

    async getHarvestById(harvestId: number): Promise<HarvestEntity> {
        this.logger.log(`Fetching harvest with ID: ${harvestId}`);
        
        const harvest = await this.harvestRepository.findOne({
            where: {
                id: harvestId
            }
        });

        if (!harvest) {
            this.logger.warn(`Harvest with ID: ${harvestId} not found`);
            throw new NotFoundException('Harvest not found');
        }

        return harvest;
    }

    async getHarvestByFarmId(farmId: number): Promise<HarvestEntity[]> {
        this.logger.log(`Fetching harvests from farm with ID: ${farmId}`);
        
        const harvests = await this.harvestRepository.find({
            where: {
                farmId: farmId
            }
        });

        if (!harvests) {
            this.logger.warn(`Harvests from farm with ID: ${farmId} not found`);
            throw new NotFoundException('Harvests not found');
        }

        return harvests;
    }

    async updateHarvest(harvestId: number, updateHarvest: CreateHarvestDto): Promise<HarvestEntity> {
        this.logger.log(`Updating harvest with ID: ${harvestId}`);
        
        const harvest = await this.getHarvestById(harvestId);
        const farm = await this.farmService.getFarmById(harvest.farmId);

        if (!harvest) {
            this.logger.warn(`Harvest with ID: ${harvestId} not found`);
            throw new NotFoundException('Harvest not found');
        }

        HarvestAreaValidator.validateHarvestArea(updateHarvest.cultivatedArea, farm.arableArea);

        return await this.harvestRepository.save({
            ...harvest,
            ...updateHarvest
        });
    }

    async deleteHarvest(harvestId: number): Promise<void> {
        this.logger.log(`Deleting harvest with ID: ${harvestId}`);
        
        const harvest = await this.getHarvestById(harvestId);

        if (!harvest) {
            this.logger.warn(`Harvest with ID: ${harvestId} not found`);
            throw new NotFoundException('Harvest not found');
        }

        await this.harvestRepository.delete(harvestId);
        this.logger.log(`Harvest with ID: ${harvestId} deleted`);
    }
}
