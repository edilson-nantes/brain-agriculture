import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HarvestEntity } from './entities/harvest.entity';
import { Repository } from 'typeorm';
import { CreateHarvestDto } from './dtos/createHarvest.dto';

@Injectable()
export class HarvestService {

    constructor(
        @InjectRepository(HarvestEntity)
        private readonly harvestRepository: Repository<HarvestEntity>,
    ) {}

    async createHarvest(farmId: number, createHarvestDto: CreateHarvestDto): Promise<HarvestEntity> {
        return await this.harvestRepository.save({
            ...createHarvestDto,
            farmId: farmId,
        });
    }

    async listAllHarvests(): Promise<HarvestEntity[]> {
        return await this.harvestRepository.find();
    }

    async getHarvestById(harvestId: number): Promise<HarvestEntity> {
        const harvest = await this.harvestRepository.findOne({
            where: {
                id: harvestId
            }
        });

        if (!harvest) {
            throw new NotFoundException('Harvest not found');
        }

        return harvest;
    }

    async getHarvestByFarmId(farmId: number): Promise<HarvestEntity[]> {
        const harvests = await this.harvestRepository.find({
            where: {
                farmId: farmId
            }
        });

        if (!harvests) {
            throw new NotFoundException('Harvests not found');
        }

        return harvests;
    }

    async updateHarvest(harvestId: number, updateHarvest: CreateHarvestDto): Promise<HarvestEntity> {
        const harvest = await this.getHarvestById(harvestId);

        if (!harvest) {
            throw new NotFoundException('Harvest not found');
        }

        return await this.harvestRepository.save({
            ...harvest,
            ...updateHarvest
        });
    }

    async deleteHarvest(harvestId: number): Promise<void> {
        const harvest = await this.getHarvestById(harvestId);

        if (!harvest) {
            throw new NotFoundException('Harvest not found');
        }

        await this.harvestRepository.delete(harvestId);
    }
}
