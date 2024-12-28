import { CreateFarmDto } from '../dtos/createFarm.dto';

export const mockCreateFarmDto: CreateFarmDto = {
  name: 'Farm 1',
  city: '',
  state: '',
  arableArea: 100,
  vegetationArea: 50,
  totalArea: 150,
};

export const mockUpdateFarmDto: CreateFarmDto = {
  name: 'Farm 1 Updated',
  city: '',
  state: '',
  arableArea: 120,
  vegetationArea: 60,
  totalArea: 180,
};

export const mockInvalidFarmDto: CreateFarmDto = {
  name: 'Invalid Farm',
  city: '',
  state: '',
  arableArea: 100,
  vegetationArea: 60,
  totalArea: 150, // Invalid because arableArea + vegetationArea > totalArea
};