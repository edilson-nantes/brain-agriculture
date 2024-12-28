import { Test, TestingModule } from '@nestjs/testing';
import { FarmerService } from '../farmer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FarmerEntity } from '../entities/farmer.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { mockFarmer, mockFarmerWithCnpj } from '../__mocks__/farmer.mock';
import { mockCreateFarmerDto, mockCreateFarmerDtoWithCnpj, mockUpdateFarmerDto, mockUpdateFarmerDtoWithCnpj, mockInvalidCpfCnpjDto, mockInvalidCpfDto, mockInvalidCnpjDto } from '../__mocks__/farmer.dto.mock';

const mockFarmerRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

describe('FarmerService', () => {
  let service: FarmerService;
  let repository: jest.Mocked<Repository<FarmerEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmerService,
        {
          provide: getRepositoryToken(FarmerEntity),
          useFactory: mockFarmerRepository,
        },
      ],
    }).compile();

    service = module.get<FarmerService>(FarmerService);
    repository = module.get<Repository<FarmerEntity>>(getRepositoryToken(FarmerEntity)) as jest.Mocked<Repository<FarmerEntity>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFarmer', () => {
    it('should create a new farmer with valid CPF', async () => {
      repository.save.mockResolvedValue(mockFarmer);

      const result = await service.createFarmer(mockCreateFarmerDto);
      expect(result).toEqual(mockFarmer);
    });

    it('should create a new farmer with valid CNPJ', async () => {
      repository.save.mockResolvedValue(mockFarmerWithCnpj);

      const result = await service.createFarmer(mockCreateFarmerDtoWithCnpj);
      expect(result).toEqual(mockFarmerWithCnpj);
    });

    it('should throw a BadRequestException for invalid CPF', async () => {
      await expect(service.createFarmer(mockInvalidCpfDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw a BadRequestException for invalid CNPJ', async () => {
      await expect(service.createFarmer(mockInvalidCnpjDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw a BadRequestException for invalid CPF/CNPJ', async () => {
      await expect(service.createFarmer(mockInvalidCpfCnpjDto)).rejects.toThrow(BadRequestException);
    });

  });

  describe('listAllFarmers', () => {
    it('should return an array of farmers', async () => {
      const farmers = [mockFarmer];
      repository.find.mockResolvedValue(farmers);

      const result = await service.listAllFarmers();
      expect(result).toEqual(farmers);
    });
  });

  describe('getFarmerById', () => {
    it('should return a farmer by ID', async () => {
      repository.findOne.mockResolvedValue(mockFarmer);

      const result = await service.getFarmerById(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['farms'] });
      expect(result).toEqual(mockFarmer);
    });

    it('should throw a NotFoundException if farmer is not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.getFarmerById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getFarmerByCpfCnpj', () => {
    it('should return a farmer by CPF/CNPJ', async () => {
      repository.findOne.mockResolvedValue(mockFarmer);

      const result = await service.getFarmerByCpfCnpj(mockFarmer.cpfCnpj);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { cpfCnpj: mockFarmer.cpfCnpj },
        relations: ['farms'],
      });
      expect(result).toEqual(mockFarmer);
    });

    it('should throw a NotFoundException if farmer is not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.getFarmerByCpfCnpj(mockFarmer.cpfCnpj)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateFarmer', () => {
    it('should update a farmer with valid CPF', async () => {
      repository.findOne.mockResolvedValue(mockFarmer);
      repository.save.mockResolvedValue({ ...mockFarmer, ...mockUpdateFarmerDto });

      const result = await service.updateFarmer(1, mockUpdateFarmerDto);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalledWith({
        ...mockFarmer,
        ...mockUpdateFarmerDto,
      });
      expect(result).toEqual({ ...mockFarmer, ...mockUpdateFarmerDto });
    });

    it('should update a farmer with valid CNPJ', async () => {
      repository.findOne.mockResolvedValue(mockFarmerWithCnpj);
      repository.save.mockResolvedValue({ ...mockFarmerWithCnpj, ...mockUpdateFarmerDtoWithCnpj });

      const result = await service.updateFarmer(2, mockUpdateFarmerDtoWithCnpj);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 2 } });
      expect(repository.save).toHaveBeenCalledWith({
        ...mockFarmerWithCnpj,
        ...mockUpdateFarmerDtoWithCnpj,
      });
      expect(result).toEqual({ ...mockFarmerWithCnpj, ...mockUpdateFarmerDtoWithCnpj });
    });

    it('should throw a BadRequestException for invalid CPF/CNPJ', async () => {
      repository.findOne.mockResolvedValue(mockFarmer);

      await expect(service.updateFarmer(1, mockInvalidCpfCnpjDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw a NotFoundException if farmer is not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.updateFarmer(1, mockUpdateFarmerDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteFarmer', () => {
    it('should delete a farmer', async () => {
      repository.findOne.mockResolvedValue(mockFarmer);
      repository.delete.mockResolvedValue({ affected: 1, raw: {} });

      await service.deleteFarmer(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if farmer is not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.deleteFarmer(1)).rejects.toThrow(NotFoundException);
    });
  });
});