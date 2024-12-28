import { FarmerEntity } from '../entities/farmer.entity';
import { cpf, cnpj } from 'cpf-cnpj-validator';

export const mockFarmer: FarmerEntity = {
  id: 1,
  cpfCnpj: cpf.generate(),
  name: 'John Doe',
  createdAt: new Date(),
  updatedAt: new Date(),
  farms: [],
};

export const mockFarmerWithCnpj: FarmerEntity = {
  id: 2,
  cpfCnpj: cnpj.generate(),
  name: 'Jane Doe',
  createdAt: new Date(),
  updatedAt: new Date(),
  farms: [],
};