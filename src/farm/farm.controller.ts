import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dtos/createFarm.dto';
import { FarmEntity } from './entities/farm.entity';

@Controller('farm')
export class FarmController {

    constructor(
        private readonly farmService: FarmService,
    ) {};

    @Post('/:farmerId')
    @UsePipes(ValidationPipe)
    async createFarm(@Param('farmerId') farmerId: number, @Body() createFarmDto: CreateFarmDto,): Promise<FarmEntity> {
        return this.farmService.createFarm(farmerId, createFarmDto);
    }

    @Get()
    async listAllFarms(): Promise<FarmEntity[]> {
        return this.farmService.listAllFarms();
    }

    @Get(':farmId')
    async getFarmById(@Param('farmId') farmId: number): Promise<FarmEntity> {
        return this.farmService.getFarmById(farmId);
    }

    @Get('farmer/:farmerId')
    async getFarmByFarmerId(@Param('farmerId') farmerId: number): Promise<FarmEntity[]> {
        return this.farmService.getFarmByFarmerId(farmerId);
    }

    @Patch(':farmId')
    async updateFarm(@Param('farmId') farmId: number, @Body() updateFarm: CreateFarmDto): Promise<FarmEntity> {
        return this.farmService.updateFarm(farmId, updateFarm);
    }

    @Delete(':farmId')
    async deleteFarm(@Param('farmId') farmId: number): Promise<void> {
        return this.farmService.deleteFarm(farmId);
    }
}
