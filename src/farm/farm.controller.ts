import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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
}
