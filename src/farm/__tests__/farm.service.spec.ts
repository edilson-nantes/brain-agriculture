import { Test, TestingModule } from '@nestjs/testing';
import { FarmService } from '../farm.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FarmEntity } from '../entities/farm.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { FarmerService } from '../../farmer/farmer.service';
import { mockFarm, mockFarm2 } from '../__mocks__/farm.mock';
import { mockCreateFarmDto, mockUpdateFarmDto, mockInvalidFarmDto, mockNegativeFarmDto } from '../__mocks__/farm.dto.mock';


const mockFarmRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

const mockFarmerService = () => ({
  getFarmerById: jest.fn(),
});

describe('FarmService', () => {
  let service: FarmService;
  let farmRepository: Repository<FarmEntity>;
  let farmerService: FarmerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmService,
        {
          provide: getRepositoryToken(FarmEntity),
          useFactory: mockFarmRepository,
        },
        {
          provide: FarmerService,
          useFactory: mockFarmerService,
        },
      ],
    }).compile();

    service = module.get<FarmService>(FarmService);
    farmRepository = module.get<Repository<FarmEntity>>(getRepositoryToken(FarmEntity));
    farmerService = module.get<FarmerService>(FarmerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFarm', () => {
    it('should create a new farm', async () => {
      jest.spyOn(farmerService, 'getFarmerById').mockResolvedValue(undefined);
      jest.spyOn(farmRepository, 'save').mockResolvedValue(mockFarm);

      const result = await service.createFarm(1, mockCreateFarmDto);
      expect(result).toEqual(mockFarm);
      expect(farmerService.getFarmerById).toHaveBeenCalledWith(1);
      expect(farmRepository.save).toHaveBeenCalledWith({
        ...mockCreateFarmDto,
        farmerId: 1,
      });
    });

    it('should throw a BadRequestException for negative area', async () => {
      jest.spyOn(farmerService, 'getFarmerById').mockResolvedValue(undefined);

      await expect(service.createFarm(1, mockNegativeFarmDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw a BadRequestException for invalid farm area', async () => {
      jest.spyOn(farmerService, 'getFarmerById').mockResolvedValue(undefined);

      await expect(service.createFarm(1, mockInvalidFarmDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('listAllFarms', () => {
    it('should return an array of farms', async () => {
      jest.spyOn(farmRepository, 'find').mockResolvedValue([mockFarm, mockFarm2]);

      const result = await service.listAllFarms();
      expect(result).toEqual([mockFarm, mockFarm2]);
      expect(farmRepository.find).toHaveBeenCalled();
    });
  });

  describe('getFarmById', () => {
    it('should return a farm by ID', async () => {
      jest.spyOn(farmRepository, 'findOne').mockResolvedValue(mockFarm);

      const result = await service.getFarmById(1);
      expect(result).toEqual(mockFarm);
      expect(farmRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['harvests'] });
    });

    it('should throw a NotFoundException if farm is not found', async () => {
      jest.spyOn(farmRepository, 'findOne').mockResolvedValue(null);

      await expect(service.getFarmById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getFarmByFarmerId', () => {
    it('should return an array of farms by farmer ID', async () => {
      jest.spyOn(farmRepository, 'find').mockResolvedValue([mockFarm, mockFarm2]);

      const result = await service.getFarmByFarmerId(1);
      expect(result).toEqual([mockFarm, mockFarm2]);
      expect(farmRepository.find).toHaveBeenCalledWith({ where: { farmerId: 1 } });
    });

    it('should throw a NotFoundException if farms are not found', async () => {
      jest.spyOn(farmRepository, 'find').mockResolvedValue(null);

      await expect(service.getFarmByFarmerId(3)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateFarm', () => {
    it('should update a farm', async () => {
      jest.spyOn(farmRepository, 'findOne').mockResolvedValue(mockFarm);
      jest.spyOn(farmRepository, 'save').mockResolvedValue({ ...mockFarm, ...mockUpdateFarmDto });

      const result = await service.updateFarm(1, mockUpdateFarmDto);
      expect(result).toEqual({ ...mockFarm, ...mockUpdateFarmDto });
      expect(farmRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(farmRepository.save).toHaveBeenCalledWith({ ...mockFarm, ...mockUpdateFarmDto });
    });

    it('should throw a NotFoundException if farm is not found', async () => {
      jest.spyOn(farmRepository, 'findOne').mockResolvedValue(null);

      await expect(service.updateFarm(1, mockUpdateFarmDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw a BadRequestException for invalid farm area', async () => {
      jest.spyOn(farmRepository, 'findOne').mockResolvedValue(mockFarm);

      await expect(service.updateFarm(1, mockInvalidFarmDto)).rejects.toThrow(BadRequestException);
    });

    it('should log a warning and throw a NotFoundException if farm is not found', async () => {
      jest.spyOn(farmRepository, 'findOne').mockResolvedValue(null);
      const loggerSpy = jest.spyOn(service['logger'], 'warn');

      await expect(service.updateFarm(1, mockUpdateFarmDto)).rejects.toThrow(NotFoundException);
      expect(loggerSpy).toHaveBeenCalledWith('Farm with ID: 1 not found');
    });
  });

  describe('deleteFarm', () => {
    it('should delete a farm', async () => {
      jest.spyOn(farmRepository, 'findOne').mockResolvedValue(mockFarm);
      jest.spyOn(farmRepository, 'delete').mockResolvedValue({ affected: 1, raw: {} });

      await service.deleteFarm(1);
      expect(farmRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if farm is not found', async () => {
      jest.spyOn(farmRepository, 'findOne').mockResolvedValue(null);

      await expect(service.deleteFarm(1)).rejects.toThrow(NotFoundException);
    });

    it('should log a warning and throw a NotFoundException if farm is not found', async () => {
      jest.spyOn(farmRepository, 'findOne').mockResolvedValue(null);
      const loggerSpy = jest.spyOn(service['logger'], 'warn');

      await expect(service.deleteFarm(1)).rejects.toThrow(NotFoundException);
      expect(loggerSpy).toHaveBeenCalledWith('Farm with ID: 1 not found');
    });
  });
});