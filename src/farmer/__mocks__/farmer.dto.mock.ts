import { CreateFarmerDto } from '../dtos/createFarmer.dto';
import { ReturnFarmerDto } from '../dtos/returnFarmer.dto';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { mockFarmer, mockFarmerWithCnpj } from './farmer.mock';

export const mockCreateFarmerDto: CreateFarmerDto = {
  cpfCnpj: cpf.generate(),
  name: 'John Doe',
};

export const mockCreateFarmerDtoWithCnpj: CreateFarmerDto = {
  cpfCnpj: cnpj.generate(),
  name: 'Jane Doe',
};

export const mockUpdateFarmerDto: CreateFarmerDto = {
  cpfCnpj: cpf.generate(),
  name: 'John Doe Updated',
};

export const mockUpdateFarmerDtoWithCnpj: CreateFarmerDto = {
  cpfCnpj: cnpj.generate(),
  name: 'Jane Doe Updated',
};

export const mockInvalidCpfCnpjDto: CreateFarmerDto = {
  cpfCnpj: 'invalid',
  name: 'Invalid Farmer',
};

export const mockReturnFarmerDto: ReturnFarmerDto = new ReturnFarmerDto(mockFarmer);

export const mockReturnFarmerDtoWithCnpj: ReturnFarmerDto = new ReturnFarmerDto(mockFarmerWithCnpj);