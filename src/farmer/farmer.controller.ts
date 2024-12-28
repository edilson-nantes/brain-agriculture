import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { CreateFarmerDto } from './dtos/createFarmer.dto';
import { FarmerEntity } from './entities/farmer.entity';
import { ReturnFarmerDto } from './dtos/returnFarmer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Farmer')
@Controller('farmer')
export class FarmerController {

    constructor (private farmerService: FarmerService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: 'Create a new farmer' })
    @ApiResponse({ status: 201, description: 'The farmer has been successfully created.', type: FarmerEntity })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiResponse({ status: 409, description: 'The CPF/CNPJ is already in use.' })
    @ApiResponse({ status: 422, description: 'The CPF/CNPJ is invalid.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async createFarmer(@Body() createFarmer: CreateFarmerDto): Promise<FarmerEntity> {
        return await this.farmerService.createFarmer(createFarmer);
    };

    @Get()
    @ApiOperation({ summary: 'List all farmers' })
    @ApiResponse({ status: 200, description: 'List of all farmers.', type: [FarmerEntity] })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async listAllFarmers(): Promise<ReturnFarmerDto[]> {
        return await this.farmerService.listAllFarmers();
    };

    @Get(':id')
    @ApiOperation({ summary: 'Get a farmer by ID' })
    @ApiResponse({ status: 200, description: 'The farmer with the given ID.', type: FarmerEntity })
    @ApiResponse({ status: 404, description: 'Farmer not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async getFarmerById(@Param('id') id: number): Promise<ReturnFarmerDto> {
        return new ReturnFarmerDto(
            await this.farmerService.getFarmerById(id)
        );
    };

    @Get('cpf-cnpj/:cpfCnpj')
    @ApiOperation({ summary: 'Get a farmer by CPF/CNPJ' })
    @ApiResponse({ status: 200, description: 'The farmer with the given CPF/CNPJ.', type: FarmerEntity })
    @ApiResponse({ status: 404, description: 'Farmer not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async getFarmerByCpfCnpj(@Param('cpfCnpj') cpfCnpj: string): Promise<ReturnFarmerDto> {
        return new ReturnFarmerDto (
            await this.farmerService.getFarmerByCpfCnpj(cpfCnpj)
        );
    };

    @Patch(':id')
    @ApiOperation({ summary: 'Update a farmer' })
    @ApiResponse({ status: 200, description: 'The farmer has been successfully updated.', type: FarmerEntity })
    @ApiResponse({ status: 404, description: 'Farmer not found.' })
    @ApiResponse({ status: 422, description: 'The CPF/CNPJ is invalid.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async updateFarmer(@Param('id') id: number, @Body() updateFarmer: CreateFarmerDto): Promise<FarmerEntity> {
        return await this.farmerService.updateFarmer(id, updateFarmer);
    };

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a farmer' })
    @ApiResponse({ status: 200, description: 'The farmer has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Farmer not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async deleteFarmer(@Param('id') id: number): Promise<void> {
        return await this.farmerService.deleteFarmer(id);
    };
}
