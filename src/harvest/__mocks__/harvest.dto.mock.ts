import { CreateHarvestDto } from '../dtos/createHarvest.dto';

export const mockCreateHarvestDto: CreateHarvestDto = {
  name: 'Harvest 1',
  year: 2024,
  cultivatedArea: 50,
};

export const mockUpdateHarvestDto: CreateHarvestDto = {
  name: 'Harvest 1 Updated',
  year: 2024,
  cultivatedArea: 60,
};

export const mockInvalidHarvestDto: CreateHarvestDto = {
  name: 'Invalid Harvest',
  year: 2024,
  cultivatedArea: 200, // Invalid because it exceeds the farm's arable area
};

export const mockNegativeHarvestDto: CreateHarvestDto = {
  name: 'Harvest 1 Updated',
  year: 2024,
  cultivatedArea: -60,
};