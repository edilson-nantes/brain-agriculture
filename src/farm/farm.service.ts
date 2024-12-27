import { Injectable, NotFoundException } from '@nestjs/common';
import { FarmEntity } from './entities/farm.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFarmDto } from './dtos/createFarm.dto';
import { FarmerService } from 'src/farmer/farmer.service';

@Injectable()
export class FarmService {

    constructor(
        @InjectRepository(FarmEntity)
        private readonly farmRepository: Repository<FarmEntity>,
        private readonly farmerService: FarmerService,
    ) {};

    async createFarm(farmerId: number, createFarmDto: CreateFarmDto): Promise<FarmEntity> {
        await this.farmerService.getFarmerById(farmerId);
        
        
        return this.farmRepository.save({
            ...createFarmDto,
            farmerId: farmerId,
        });
    }

    async listAllFarms(): Promise<FarmEntity[]> {
        return await this.farmRepository.find();
    }

    async getFarmById(farmId: number): Promise<FarmEntity> {
        const farm = await this.farmRepository.findOne({
            where: {
                id: farmId
            },
            relations: ['farmer']
        });

        if (!farm) {
            throw new NotFoundException('Farm not found');
        }

        return farm;
    }

    async getFarmByFarmerId(farmerId: number): Promise<FarmEntity[]> {
        const farms = await this.farmRepository.find({
            where: {
                farmerId: farmerId
            }
        });

        if (!farms) {
            throw new NotFoundException('Farms not found');
        }

        return farms;
    }

    async updateFarm(farmId: number, updateFarm: CreateFarmDto): Promise<FarmEntity> {
        const farm = await this.farmRepository.findOne({
            where: {
                id: farmId
            }
        });

        if (!farm) {
            throw new NotFoundException('Farm not found');
        }

        return this.farmRepository.save({
            ...farm,
            ...updateFarm
        });
    }

    async deleteFarm(farmId: number): Promise<void> {
        const farm = await this.farmRepository.findOne({
            where: {
                id: farmId
            }
        });

        if (!farm) {
            throw new NotFoundException('Farm not found');
        }

        await this.farmRepository.delete(farmId);
    }
}
