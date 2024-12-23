import { Module } from '@nestjs/common';
import { FarmService } from './farm.service';
import { FarmController } from './farm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmEntity } from './entities/farm.entity';
import { FarmerModule } from 'src/farmer/farmer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FarmEntity]),
    FarmerModule
  ],
  providers: [FarmService],
  controllers: [FarmController]
})
export class FarmModule {}