import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { HarvestService } from './harvest.service';
import { CreateHarvestDto } from './dtos/createHarvest.dto';
import { HarvestEntity } from './entities/harvest.entity';
import { ReturnHarvestDto } from './dtos/returnHarvest.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Harvest')
@Controller('harvest')
export class HarvestController {

    constructor(
        private readonly harvestService: HarvestService
    ) {}

    @Post('/:farmId')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Create a new harvest' })
    @ApiResponse({ status: 201, description: 'The harvest has been successfully created.', type: HarvestEntity })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiResponse({ status: 404, description: 'Farm not found.' })
    async createHarvest(@Param('farmId') farmId: number, @Body() createHarvestDto: CreateHarvestDto,): Promise<HarvestEntity> {
        return await this.harvestService.createHarvest(farmId, createHarvestDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all harvests' })
    @ApiResponse({ status: 200, description: 'List of all harvests.', type: [HarvestEntity] })
    async listAllHarvests(): Promise<HarvestEntity[]> {
        return await this.harvestService.listAllHarvests();
    }

    @Get(':harvestId')
    @ApiOperation({ summary: 'Get a harvest by ID' })
    @ApiResponse({ status: 200, description: 'The harvest with the given ID.', type: HarvestEntity })
    @ApiResponse({ status: 404, description: 'Harvest not found.' })
    async getHarvestById(@Param('harvestId') harvestId: number): Promise<ReturnHarvestDto> {
        return new ReturnHarvestDto (
            await this.harvestService.getHarvestById(harvestId)
        );
    }

    @Get('farm/:farmId')
    @ApiOperation({ summary: 'Get a harvest by farm ID' })
    @ApiResponse({ status: 200, description: 'The harvest with the given farm ID.', type: [HarvestEntity] })
    @ApiResponse({ status: 404, description: 'Harvest not found.' })
    async getHarvestByFarmId(@Param('farmId') farmId: number): Promise<HarvestEntity[]> {
        return await this.harvestService.getHarvestByFarmId(farmId);
    }

    @Patch(':harvestId')
    @ApiOperation({ summary: 'Update a harvest' })
    @ApiResponse({ status: 200, description: 'The harvest has been successfully updated.', type: HarvestEntity })
    @ApiResponse({ status: 404, description: 'Harvest not found.' })
    async updateHarvest(@Param('harvestId') harvestId: number, @Body() updateHarvest: CreateHarvestDto): Promise<HarvestEntity> {
        return await this.harvestService.updateHarvest(harvestId, updateHarvest);
    }

    @Delete(':harvestId')
    @ApiOperation({ summary: 'Delete a harvest' })
    @ApiResponse({ status: 200, description: 'The harvest has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Harvest not found.' })
    async deleteHarvest(@Param('harvestId') harvestId: number): Promise<void> {
        return await this.harvestService.deleteHarvest(harvestId);
    }
}
