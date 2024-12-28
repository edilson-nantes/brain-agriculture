import { FarmEntity } from '../entities/farm.entity';

export const mockFarm: FarmEntity = {
  id: 1,
  name: 'Farm 1',
  city: '',
  state: '',
  arableArea: 100,
  vegetationArea: 50,
  totalArea: 150,
  farmerId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockFarm2: FarmEntity = {
  id: 2,
  name: 'Farm 2',
  city: '',
  state: '',
  arableArea: 200,
  vegetationArea: 100,
  totalArea: 300,
  farmerId: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
};