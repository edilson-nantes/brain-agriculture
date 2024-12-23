import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { CreateFarmerDto } from './dtos/createFarmer.dto';
import { FarmerEntity } from './entities/farmer.entity';

@Controller('farmer')
export class FarmerController {

    constructor (private farmerService: FarmerService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async createFarmer(@Body() createFarmer: CreateFarmerDto): Promise<FarmerEntity> {
        return await this.farmerService.createFarmer(createFarmer);
    };

    @Get()
    async listAllFarmers(): Promise<FarmerEntity[]> {
        return await this.farmerService.listAllFarmers();
    };

    @Get(':id')
    async getFarmerById(@Param('id') id: number): Promise<FarmerEntity> {
        return await this.farmerService.getFarmerById(id);
    };

    @Get('cpf-cnpj/:cpfCnpj')
    async getFarmerByCpfCnpj(@Param('cpfCnpj') cpfCnpj: string): Promise<FarmerEntity> {
        return await this.farmerService.getFarmerByCpfCnpj(cpfCnpj);
    };

    @Patch(':id')
    async updateFarmer(@Param('id') id: number, @Body() updateFarmer: CreateFarmerDto): Promise<FarmerEntity> {
        return await this.farmerService.updateFarmer(id, updateFarmer);
    };

    @Delete(':id')
    async deleteFarmer(@Param('id') id: number): Promise<void> {
        return await this.farmerService.deleteFarmer(id);
    };
}
