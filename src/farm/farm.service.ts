import { Injectable } from '@nestjs/common';
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
        // chamar o service de cidade e estado para validar se existe
        
        
        return this.farmRepository.save({
            ...createFarmDto,
            farmerId: farmerId,
        });
    }
}
