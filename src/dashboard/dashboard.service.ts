import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FarmEntity } from '../farm/entities/farm.entity';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(FarmEntity)
        private readonly farmRepository: Repository<FarmEntity>,
    ) {}

    async getDashboardData(): Promise<any> {
        const totalFarms = await this.farmRepository.count();
        const totalHectares = await this.farmRepository
            .createQueryBuilder('farm')
            .select('SUM(farm.totalArea)', 'total')
            .getRawOne();

        const farmsByState = await this.farmRepository
            .createQueryBuilder('farm')
            .select('farm.state, COUNT(farm.id) as count')
            .groupBy('farm.state')
            .getRawMany();

        const farmsByHarvest = await this.farmRepository
            .createQueryBuilder('farm')
            .leftJoinAndSelect('farm.harvests', 'harvest')
            .select('harvest.name, COUNT(farm.id) as count')
            .groupBy('harvest.name')
            .getRawMany();

        const landUsage = await this.farmRepository
            .createQueryBuilder('farm')
            .select('SUM(farm.arableArea) as arableArea, SUM(farm.vegetationArea) as vegetationArea')
            .getRawOne();

        return {
            totalFarms,
            totalHectares: totalHectares.total,
            farmsByState,
            farmsByHarvest,
            landUsage,
        };
    }
}