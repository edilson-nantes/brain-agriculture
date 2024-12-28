import { Test, TestingModule } from '@nestjs/testing';
import { HarvestController } from '../harvest.controller';
import { HarvestService } from '../harvest.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { mockHarvest, mockHarvest2 } from '../__mocks__/harvest.mock';
import { mockCreateHarvestDto, mockUpdateHarvestDto, mockInvalidHarvestDto } from '../__mocks__/harvest.dto.mock';
import { ReturnHarvestDto } from '../dtos/returnHarvest.dto';

const mockHarvestService = () => ({
  createHarvest: jest.fn(),
  listAllHarvests: jest.fn(),
  getHarvestById: jest.fn(),
  getHarvestByFarmId: jest.fn(),
  updateHarvest: jest.fn(),
  deleteHarvest: jest.fn(),
});

describe('HarvestController', () => {
  let controller: HarvestController;
  let service: HarvestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestController],
      providers: [
        {
          provide: HarvestService,
          useFactory: mockHarvestService,
        },
      ],
    }).compile();

    controller = module.get<HarvestController>(HarvestController);
    service = module.get<HarvestService>(HarvestService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createHarvest', () => {
    it('should create a new harvest', async () => {
      jest.spyOn(service, 'createHarvest').mockResolvedValue(mockHarvest);

      const result = await controller.createHarvest(1, mockCreateHarvestDto);
      expect(result).toEqual(mockHarvest);
      expect(service.createHarvest).toHaveBeenCalledWith(1, mockCreateHarvestDto);
    });

    it('should throw a BadRequestException for invalid harvest area', async () => {
      jest.spyOn(service, 'createHarvest').mockRejectedValue(new BadRequestException('Invalid harvest area'));

      await expect(controller.createHarvest(1, mockInvalidHarvestDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw a NotFoundException if farm is not found', async () => {
      jest.spyOn(service, 'createHarvest').mockRejectedValue(new NotFoundException('Farm not found'));

      await expect(controller.createHarvest(1, mockCreateHarvestDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('listAllHarvests', () => {
    it('should return an array of harvests', async () => {
      jest.spyOn(service, 'listAllHarvests').mockResolvedValue([mockHarvest, mockHarvest2]);

      const result = await controller.listAllHarvests();
      expect(result).toEqual([mockHarvest, mockHarvest2]);
      expect(service.listAllHarvests).toHaveBeenCalled();
    });

    it('should handle empty array of harvests', async () => {
      jest.spyOn(service, 'listAllHarvests').mockResolvedValue([]);

      const result = await controller.listAllHarvests();
      expect(result).toEqual([]);
      expect(service.listAllHarvests).toHaveBeenCalled();
    });
  });

  describe('getHarvestById', () => {
    it('should return a harvest by ID', async () => {
      jest.spyOn(service, 'getHarvestById').mockResolvedValue(mockHarvest);

      const result = await controller.getHarvestById(1);
      expect(result).toEqual(new ReturnHarvestDto(mockHarvest));
      expect(service.getHarvestById).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if harvest is not found', async () => {
      jest.spyOn(service, 'getHarvestById').mockRejectedValue(new NotFoundException('Harvest not found'));

      await expect(controller.getHarvestById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getHarvestByFarmId', () => {
    it('should return harvests by farm ID', async () => {
      jest.spyOn(service, 'getHarvestByFarmId').mockResolvedValue([mockHarvest, mockHarvest2]);

      const result = await controller.getHarvestByFarmId(1);
      expect(result).toEqual([mockHarvest, mockHarvest2]);
      expect(service.getHarvestByFarmId).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if no harvests are found for the farm', async () => {
      jest.spyOn(service, 'getHarvestByFarmId').mockRejectedValue(new NotFoundException('No harvests found for farm'));

      await expect(controller.getHarvestByFarmId(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateHarvest', () => {
    it('should update a harvest', async () => {
      jest.spyOn(service, 'updateHarvest').mockResolvedValue({ ...mockHarvest, ...mockUpdateHarvestDto });

      const result = await controller.updateHarvest(1, mockUpdateHarvestDto);
      expect(result).toEqual({ ...mockHarvest, ...mockUpdateHarvestDto });
      expect(service.updateHarvest).toHaveBeenCalledWith(1, mockUpdateHarvestDto);
    });

    it('should throw a BadRequestException for invalid harvest area', async () => {
      jest.spyOn(service, 'updateHarvest').mockRejectedValue(new BadRequestException('Invalid harvest area'));

      await expect(controller.updateHarvest(1, mockInvalidHarvestDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw a NotFoundException if harvest is not found', async () => {
      jest.spyOn(service, 'updateHarvest').mockRejectedValue(new NotFoundException('Harvest not found'));

      await expect(controller.updateHarvest(1, mockUpdateHarvestDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw a NotFoundException if farm is not found', async () => {
      jest.spyOn(service, 'updateHarvest').mockRejectedValue(new NotFoundException('Farm not found'));

      await expect(controller.updateHarvest(1, mockUpdateHarvestDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteHarvest', () => {
    it('should delete a harvest', async () => {
      jest.spyOn(service, 'deleteHarvest').mockResolvedValue(undefined);

      await controller.deleteHarvest(1);
      expect(service.deleteHarvest).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if harvest is not found', async () => {
      jest.spyOn(service, 'deleteHarvest').mockRejectedValue(new NotFoundException('Harvest not found'));

      await expect(controller.deleteHarvest(1)).rejects.toThrow(NotFoundException);
    });
  });
});