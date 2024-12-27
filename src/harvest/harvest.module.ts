import { Module } from '@nestjs/common';
import { HarvestService } from './harvest.service';
import { HarvestController } from './harvest.controller';
import { HarvestEntity } from './entities/harvest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmModule } from 'src/farm/farm.module';

@Module({
  imports: [TypeOrmModule.forFeature([HarvestEntity]),
    FarmModule
  ],
  providers: [HarvestService],
  controllers: [HarvestController]
})
export class HarvestModule {}
