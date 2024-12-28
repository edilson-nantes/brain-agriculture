import { HarvestEntity } from '../entities/harvest.entity';

export const mockHarvest: HarvestEntity = {
    id: 1,
    name: 'Harvest 1',
    year: 2024,
    cultivatedArea: 50,
    farmId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
};

export const mockHarvest2: HarvestEntity = {
    id: 2,
    name: 'Harvest 2',
    year: 2024,
    cultivatedArea: 100,
    farmId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
};