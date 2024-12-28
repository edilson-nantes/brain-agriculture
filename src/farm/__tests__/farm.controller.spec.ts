import { Test, TestingModule } from '@nestjs/testing';
import { FarmController } from '../farm.controller';
import { FarmService } from '../farm.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { mockFarm, mockFarm2 } from '../__mocks__/farm.mock';
import { mockCreateFarmDto, mockUpdateFarmDto, mockInvalidFarmDto } from '../__mocks__/farm.dto.mock';
import { ReturnFarmDto } from '../dtos/returnFarm.dto';

const mockFarmService = () => ({
  createFarm: jest.fn(),
  listAllFarms: jest.fn(),
  getFarmById: jest.fn(),
  getFarmByFarmerId: jest.fn(),
  updateFarm: jest.fn(),
  deleteFarm: jest.fn(),
});

describe('FarmController', () => {
  let controller: FarmController;
  let service: FarmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmController],
      providers: [
        {
          provide: FarmService,
          useFactory: mockFarmService,
        },
      ],
    }).compile();

    controller = module.get<FarmController>(FarmController);
    service = module.get<FarmService>(FarmService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createFarm', () => {
    it('should create a new farm with valid areas', async () => {
      jest.spyOn(service, 'createFarm').mockResolvedValue(mockFarm);

      const result = await controller.createFarm(1, mockCreateFarmDto);
      expect(result).toEqual(mockFarm);
      expect(service.createFarm).toHaveBeenCalledWith(1, mockCreateFarmDto);
    });

    it('should throw a BadRequestException for invalid farm area', async () => {
      jest.spyOn(service, 'createFarm').mockRejectedValue(new BadRequestException('Invalid farm area'));

      await expect(controller.createFarm(1, mockInvalidFarmDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw a NotFoundException if farmer is not found', async () => {
      jest.spyOn(service, 'createFarm').mockRejectedValue(new NotFoundException('Farmer not found'));

      await expect(controller.createFarm(1, mockCreateFarmDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('listAllFarms', () => {
    it('should return an array of farms', async () => {
      jest.spyOn(service, 'listAllFarms').mockResolvedValue([mockFarm, mockFarm2]);

      const result = await controller.listAllFarms();
      expect(result).toEqual([mockFarm, mockFarm2]);
      expect(service.listAllFarms).toHaveBeenCalled();
    });
  });

  describe('getFarmById', () => {
    it('should return a farm by ID', async () => {
      jest.spyOn(service, 'getFarmById').mockResolvedValue(mockFarm);

      const result = await controller.getFarmById(1);
      expect(result).toEqual(new ReturnFarmDto(mockFarm));
      expect(service.getFarmById).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if farm is not found', async () => {
      jest.spyOn(service, 'getFarmById').mockRejectedValue(new NotFoundException('Farm not found'));

      await expect(controller.getFarmById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getFarmByFarmerId', () => {
    it('should return farms by farmer ID', async () => {
      jest.spyOn(service, 'getFarmByFarmerId').mockResolvedValue([mockFarm, mockFarm2]);

      const result = await controller.getFarmByFarmerId(1);
      expect(result).toEqual([mockFarm, mockFarm2]);
      expect(service.getFarmByFarmerId).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if no farms are found for the farmer', async () => {
      jest.spyOn(service, 'getFarmByFarmerId').mockRejectedValue(new NotFoundException('No farms found for farmer'));

      await expect(controller.getFarmByFarmerId(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateFarm', () => {
    it('should update a farm with valid areas', async () => {
      jest.spyOn(service, 'updateFarm').mockResolvedValue({ ...mockFarm, ...mockUpdateFarmDto });

      const result = await controller.updateFarm(1, mockUpdateFarmDto);
      expect(result).toEqual({ ...mockFarm, ...mockUpdateFarmDto });
      expect(service.updateFarm).toHaveBeenCalledWith(1, mockUpdateFarmDto);
    });

    it('should throw a BadRequestException for invalid farm area', async () => {
      jest.spyOn(service, 'updateFarm').mockRejectedValue(new BadRequestException('Invalid farm area'));

      await expect(controller.updateFarm(1, mockInvalidFarmDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw a NotFoundException if farm is not found', async () => {
      jest.spyOn(service, 'updateFarm').mockRejectedValue(new NotFoundException('Farm not found'));

      await expect(controller.updateFarm(1, mockUpdateFarmDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteFarm', () => {
    it('should delete a farm', async () => {
      jest.spyOn(service, 'deleteFarm').mockResolvedValue(undefined);

      await controller.deleteFarm(1);
      expect(service.deleteFarm).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if farm is not found', async () => {
      jest.spyOn(service, 'deleteFarm').mockRejectedValue(new NotFoundException('Farm not found'));

      await expect(controller.deleteFarm(1)).rejects.toThrow(NotFoundException);
    });
  });
});