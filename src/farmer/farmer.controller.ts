import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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
}
