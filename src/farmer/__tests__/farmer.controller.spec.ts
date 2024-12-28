import { Test, TestingModule } from '@nestjs/testing';
import { FarmerController } from '../farmer.controller';
import { FarmerService } from '../farmer.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mockFarmer, mockFarmerWithCnpj } from '../__mocks__/farmer.mock';
import { mockCreateFarmerDto, mockCreateFarmerDtoWithCnpj, mockUpdateFarmerDto, mockUpdateFarmerDtoWithCnpj, mockInvalidCpfCnpjDto, mockReturnFarmerDto, mockReturnFarmerDtoWithCnpj } from '../__mocks__/farmer.dto.mock';

const mockFarmerService = () => ({
  createFarmer: jest.fn(),
  listAllFarmers: jest.fn(),
  getFarmerById: jest.fn(),
  getFarmerByCpfCnpj: jest.fn(),
  updateFarmer: jest.fn(),
  deleteFarmer: jest.fn(),
});

describe('FarmerController', () => {
  let controller: FarmerController;
  let service: FarmerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmerController],
      providers: [
        {
          provide: FarmerService,
          useFactory: mockFarmerService,
        },
      ],
    }).compile();

    controller = module.get<FarmerController>(FarmerController);
    service = module.get<FarmerService>(FarmerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createFarmer', () => {
    it('should create a new farmer with valid CPF', async () => {
      jest.spyOn(service, 'createFarmer').mockResolvedValue(mockFarmer);

      const result = await controller.createFarmer(mockCreateFarmerDto);
      expect(result).toEqual(mockFarmer);
      expect(service.createFarmer).toHaveBeenCalledWith(mockCreateFarmerDto);
    });

    it('should create a new farmer with valid CNPJ', async () => {
      jest.spyOn(service, 'createFarmer').mockResolvedValue(mockFarmerWithCnpj);

      const result = await controller.createFarmer(mockCreateFarmerDtoWithCnpj);
      expect(result).toEqual(mockFarmerWithCnpj);
      expect(service.createFarmer).toHaveBeenCalledWith(mockCreateFarmerDtoWithCnpj);
    });

    it('should throw a BadRequestException for invalid CPF/CNPJ', async () => {
      jest.spyOn(service, 'createFarmer').mockRejectedValue(new BadRequestException('Invalid CPF/CNPJ'));

      await expect(controller.createFarmer(mockInvalidCpfCnpjDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('listAllFarmers', () => {
    it('should return an array of farmers', async () => {
      const farmers = [mockFarmer];
      jest.spyOn(service, 'listAllFarmers').mockResolvedValue(farmers);

      const result = await controller.listAllFarmers();
      expect(result).toEqual(farmers);
      expect(service.listAllFarmers).toHaveBeenCalled();
    });
  });

  describe('getFarmerById', () => {
    it('should return a farmer by ID', async () => {
      jest.spyOn(service, 'getFarmerById').mockResolvedValue(mockFarmer);

      const result = await controller.getFarmerById(1);
      expect(result).toEqual(mockReturnFarmerDto);
      expect(service.getFarmerById).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if farmer is not found', async () => {
      jest.spyOn(service, 'getFarmerById').mockRejectedValue(new NotFoundException());

      await expect(controller.getFarmerById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getFarmerByCpfCnpj', () => {
    it('should return a farmer by CPF/CNPJ', async () => {
      jest.spyOn(service, 'getFarmerByCpfCnpj').mockResolvedValue(mockFarmer);

      const result = await controller.getFarmerByCpfCnpj(mockFarmer.cpfCnpj);
      expect(result).toEqual(mockReturnFarmerDto);
      expect(service.getFarmerByCpfCnpj).toHaveBeenCalledWith(mockFarmer.cpfCnpj);
    });

    it('should throw a NotFoundException if farmer is not found', async () => {
      jest.spyOn(service, 'getFarmerByCpfCnpj').mockRejectedValue(new NotFoundException());

      await expect(controller.getFarmerByCpfCnpj('12345678909')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateFarmer', () => {
    it('should update a farmer with valid CPF', async () => {
      jest.spyOn(service, 'updateFarmer').mockResolvedValue({ ...mockFarmer, ...mockUpdateFarmerDto });

      const result = await controller.updateFarmer(1, mockUpdateFarmerDto);
      expect(result).toEqual({ ...mockFarmer, ...mockUpdateFarmerDto });
      expect(service.updateFarmer).toHaveBeenCalledWith(1, mockUpdateFarmerDto);
    });

    it('should update a farmer with valid CNPJ', async () => {
      jest.spyOn(service, 'updateFarmer').mockResolvedValue({ ...mockFarmerWithCnpj, ...mockUpdateFarmerDtoWithCnpj });

      const result = await controller.updateFarmer(2, mockUpdateFarmerDtoWithCnpj);
      expect(result).toEqual({ ...mockFarmerWithCnpj, ...mockUpdateFarmerDtoWithCnpj });
      expect(service.updateFarmer).toHaveBeenCalledWith(2, mockUpdateFarmerDtoWithCnpj);
    });

    it('should throw a BadRequestException for invalid CPF/CNPJ', async () => {
      jest.spyOn(service, 'updateFarmer').mockRejectedValue(new BadRequestException('Invalid CPF/CNPJ'));

      await expect(controller.updateFarmer(1, mockInvalidCpfCnpjDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw a NotFoundException if farmer is not found', async () => {
      jest.spyOn(service, 'updateFarmer').mockRejectedValue(new NotFoundException());

      await expect(controller.updateFarmer(1, mockUpdateFarmerDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteFarmer', () => {
    it('should delete a farmer', async () => {
      jest.spyOn(service, 'deleteFarmer').mockResolvedValue(undefined);

      await controller.deleteFarmer(1);
      expect(service.deleteFarmer).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if farmer is not found', async () => {
      jest.spyOn(service, 'deleteFarmer').mockRejectedValue(new NotFoundException());

      await expect(controller.deleteFarmer(1)).rejects.toThrow(NotFoundException);
    });
  });
});