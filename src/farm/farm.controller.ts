import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dtos/createFarm.dto';
import { FarmEntity } from './entities/farm.entity';
import { ReturnFarmDto } from './dtos/returnFarm.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Farm')
@Controller('farm')
export class FarmController {

    constructor(
        private readonly farmService: FarmService,
    ) {};

    @Post('/:farmerId')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Create a new farm' })
    @ApiResponse({ status: 201, description: 'The farm has been successfully created.', type: FarmEntity })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiResponse({ status: 404, description: 'Farmer not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async createFarm(@Param('farmerId') farmerId: number, @Body() createFarmDto: CreateFarmDto,): Promise<FarmEntity> {
        return await this.farmService.createFarm(farmerId, createFarmDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all farms' })
    @ApiResponse({ status: 200, description: 'List of all farms.', type: [FarmEntity] })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async listAllFarms(): Promise<FarmEntity[]> {
        return await this.farmService.listAllFarms();
    }

    @Get(':farmId')
    @ApiOperation({ summary: 'Get a farm by ID' })
    @ApiResponse({ status: 200, description: 'The farm with the given ID.', type: FarmEntity })
    @ApiResponse({ status: 404, description: 'Farm not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async getFarmById(@Param('farmId') farmId: number): Promise<ReturnFarmDto> {
        return new ReturnFarmDto (
            await this.farmService.getFarmById(farmId)
        );
    }

    @Get('farmer/:farmerId')
    @ApiOperation({ summary: 'Get a farm by farmer ID' })
    @ApiResponse({ status: 200, description: 'The farm with the given farmer ID.', type: [FarmEntity] })
    @ApiResponse({ status: 404, description: 'Farm not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async getFarmByFarmerId(@Param('farmerId') farmerId: number): Promise<FarmEntity[]> {
        return await this.farmService.getFarmByFarmerId(farmerId)
    }

    @Patch(':farmId')
    @ApiOperation({ summary: 'Update a farm' })
    @ApiResponse({ status: 200, description: 'The farm has been successfully updated.', type: FarmEntity })
    @ApiResponse({ status: 404, description: 'Farm not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async updateFarm(@Param('farmId') farmId: number, @Body() updateFarm: CreateFarmDto): Promise<FarmEntity> {
        return await this.farmService.updateFarm(farmId, updateFarm);
    }

    @Delete(':farmId')
    @ApiOperation({ summary: 'Delete a farm' })
    @ApiResponse({ status: 200, description: 'The farm has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Farm not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async deleteFarm(@Param('farmId') farmId: number): Promise<void> {
        return await this.farmService.deleteFarm(farmId);
    }
}
