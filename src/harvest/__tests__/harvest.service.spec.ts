import { Test, TestingModule } from '@nestjs/testing';
import { HarvestService } from '../harvest.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HarvestEntity } from '../entities/harvest.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { FarmService } from '../../farm/farm.service';
import { mockHarvest, mockHarvest2 } from '../__mocks__/harvest.mock';
import { mockCreateHarvestDto, mockUpdateHarvestDto, mockInvalidHarvestDto } from '../__mocks__/harvest.dto.mock';
import { FarmEntity } from '../../farm/entities/farm.entity';
import { mockFarm } from '../../farm/__mocks__/farm.mock';
import { HarvestAreaValidator } from '../validators/harvestArea.validator';

const mockHarvestRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

const mockFarmService = () => ({
  getFarmById: jest.fn(),
});

describe('HarvestService', () => {
  let service: HarvestService;
  let harvestRepository: Repository<HarvestEntity>;
  let farmService: FarmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestService,
        {
          provide: getRepositoryToken(HarvestEntity),
          useFactory: mockHarvestRepository,
        },
        {
          provide: FarmService,
          useFactory: mockFarmService,
        },
      ],
    }).compile();

    service = module.get<HarvestService>(HarvestService);
    harvestRepository = module.get<Repository<HarvestEntity>>(getRepositoryToken(HarvestEntity));
    farmService = module.get<FarmService>(FarmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createHarvest', () => {
    it('should create a new harvest', async () => {
      jest.spyOn(farmService, 'getFarmById').mockResolvedValue(mockFarm);
      jest.spyOn(harvestRepository, 'save').mockResolvedValue(mockHarvest);

      const result = await service.createHarvest(1, mockCreateHarvestDto);
      expect(result).toEqual(mockHarvest);
      expect(farmService.getFarmById).toHaveBeenCalledWith(1);
      expect(harvestRepository.save).toHaveBeenCalledWith({
        ...mockCreateHarvestDto,
        farmId: 1,
      });
    });

    it('should throw a BadRequestException for invalid harvest area', async () => {
      jest.spyOn(farmService, 'getFarmById').mockResolvedValue(mockFarm);

      await expect(service.createHarvest(1, mockInvalidHarvestDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw a NotFoundException if farm is not found', async () => {
      jest.spyOn(farmService, 'getFarmById').mockRejectedValue(new NotFoundException('Farm not found'));

      await expect(service.createHarvest(1, mockCreateHarvestDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('listAllHarvests', () => {
    it('should return an array of harvests', async () => {
      jest.spyOn(harvestRepository, 'find').mockResolvedValue([mockHarvest, mockHarvest2]);

      const result = await service.listAllHarvests();
      expect(result).toEqual([mockHarvest, mockHarvest2]);
      expect(harvestRepository.find).toHaveBeenCalled();
    });
  });

  describe('getHarvestById', () => {
    it('should return a harvest by ID', async () => {
      jest.spyOn(harvestRepository, 'findOne').mockResolvedValue(mockHarvest);

      const result = await service.getHarvestById(1);
      expect(result).toEqual(mockHarvest);
      expect(harvestRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw a NotFoundException if harvest is not found', async () => {
      jest.spyOn(harvestRepository, 'findOne').mockResolvedValue(null);

      await expect(service.getHarvestById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateHarvest', () => {
    it('should update a harvest', async () => {
      jest.spyOn(harvestRepository, 'findOne').mockResolvedValue(mockHarvest);
      jest.spyOn(farmService, 'getFarmById').mockResolvedValue(mockFarm);
      jest.spyOn(harvestRepository, 'save').mockResolvedValue({ ...mockHarvest, ...mockUpdateHarvestDto });

      const result = await service.updateHarvest(1, mockUpdateHarvestDto);
      expect(result).toEqual({ ...mockHarvest, ...mockUpdateHarvestDto });
      expect(harvestRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(harvestRepository.save).toHaveBeenCalledWith({ ...mockHarvest, ...mockUpdateHarvestDto });
    });

    it('should throw a NotFoundException if harvest is not found', async () => {
      jest.spyOn(harvestRepository, 'findOne').mockResolvedValue(null);

      await expect(service.updateHarvest(1, mockUpdateHarvestDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw a BadRequestException for invalid harvest area', async () => {
      jest.spyOn(harvestRepository, 'findOne').mockResolvedValue(mockHarvest);
      jest.spyOn(farmService, 'getFarmById').mockResolvedValue(mockFarm);

      await expect(service.updateHarvest(1, mockInvalidHarvestDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw a NotFoundException if farm is not found', async () => {
      jest.spyOn(harvestRepository, 'findOne').mockResolvedValue(mockHarvest);
      jest.spyOn(farmService, 'getFarmById').mockRejectedValue(new NotFoundException('Farm not found'));

      await expect(service.updateHarvest(1, mockUpdateHarvestDto)).rejects.toThrow(NotFoundException);
    });

    it('should log a warning and throw a NotFoundException if harvest is not found', async () => {
      jest.spyOn(harvestRepository, 'findOne').mockResolvedValue(null);
      const loggerSpy = jest.spyOn(service['logger'], 'warn');

      await expect(service.updateHarvest(1, mockUpdateHarvestDto)).rejects.toThrow(NotFoundException);
      expect(loggerSpy).toHaveBeenCalledWith('Harvest with ID: 1 not found');
    });
  });

  describe('deleteHarvest', () => {
    it('should delete a harvest', async () => {
      jest.spyOn(harvestRepository, 'findOne').mockResolvedValue(mockHarvest);
      jest.spyOn(harvestRepository, 'delete').mockResolvedValue({ affected: 1, raw: {} });

      await service.deleteHarvest(1);
      expect(harvestRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if harvest is not found', async () => {
      jest.spyOn(harvestRepository, 'findOne').mockResolvedValue(null);

      await expect(service.deleteHarvest(1)).rejects.toThrow(NotFoundException);
    });

    it('should log a warning and throw a NotFoundException if harvest is not found', async () => {
      jest.spyOn(harvestRepository, 'findOne').mockResolvedValue(null);
      const loggerSpy = jest.spyOn(service['logger'], 'warn');

      await expect(service.deleteHarvest(1)).rejects.toThrow(NotFoundException);
      expect(loggerSpy).toHaveBeenCalledWith('Harvest with ID: 1 not found');
    });
  });
});