import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { FarmModule } from 'src/farm/farm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmEntity } from 'src/farm/entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FarmEntity])],
  providers: [DashboardService],
  controllers: [DashboardController]
})
export class DashboardModule {}
