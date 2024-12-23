import { Module } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { FarmerController } from './farmer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmerEntity } from './entities/farmer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FarmerEntity])],
  providers: [FarmerService],
  controllers: [FarmerController],
  exports: [FarmerService]
})
export class FarmerModule {}
