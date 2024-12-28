import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmEntity } from '../farm/entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FarmEntity])],
  providers: [DashboardService],
  controllers: [DashboardController]
})
export class DashboardModule {}
