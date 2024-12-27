import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { HarvestService } from './harvest.service';
import { CreateHarvestDto } from './dtos/createHarvest.dto';
import { HarvestEntity } from './entities/harvest.entity';

@Controller('harvest')
export class HarvestController {

    constructor(
        private readonly harvestService: HarvestService
    ) {}

    @Post('/:farmId')
    @UsePipes(ValidationPipe)
    async createHarvest(@Param('farmId') farmId: number, @Body() createHarvestDto: CreateHarvestDto,): Promise<HarvestEntity> {
        return await this.harvestService.createHarvest(farmId, createHarvestDto);
    }

    @Get()
    async listAllHarvests(): Promise<HarvestEntity[]> {
        return await this.harvestService.listAllHarvests();
    }

    @Get(':harvestId')
    async getHarvestById(@Param('harvestId') harvestId: number): Promise<HarvestEntity> {
        return await this.harvestService.getHarvestById(harvestId);
    }

    @Get('farm/:farmId')
    async getHarvestByFarmId(@Param('farmId') farmId: number): Promise<HarvestEntity[]> {
        return await this.harvestService.getHarvestByFarmId(farmId);
    }

    @Patch(':harvestId')
    async updateHarvest(@Param('harvestId') harvestId: number, @Body() updateHarvest: CreateHarvestDto): Promise<HarvestEntity> {
        return await this.harvestService.updateHarvest(harvestId, updateHarvest);
    }

    @Delete(':harvestId')
    async deleteHarvest(@Param('harvestId') harvestId: number): Promise<void> {
        return await this.harvestService.deleteHarvest(harvestId);
    }
}
