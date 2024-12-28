import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from '../dashboard.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FarmEntity } from '../../farm/entities/farm.entity';
import { Repository } from 'typeorm';
import { mockTotalFarms, mockTotalHectares, mockFarmsByState, mockFarmsByHarvest, mockLandUsage } from '../__mocks__/dashboard.mock';

const mockFarmRepository = () => ({
  count: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue({
    select: jest.fn().mockReturnThis(),
    getRawOne: jest.fn(),
    getRawMany: jest.fn(),
    groupBy: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
  }),
});

describe('DashboardService', () => {
  let service: DashboardService;
  let farmRepository: Repository<FarmEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: getRepositoryToken(FarmEntity),
          useFactory: mockFarmRepository,
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    farmRepository = module.get<Repository<FarmEntity>>(getRepositoryToken(FarmEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDashboardData', () => {
    it('should return dashboard data', async () => {
      jest.spyOn(farmRepository, 'count').mockResolvedValue(mockTotalFarms);
      jest.spyOn(farmRepository.createQueryBuilder(), 'getRawOne').mockResolvedValue(mockTotalHectares);
      jest.spyOn(farmRepository.createQueryBuilder(), 'getRawMany')
        .mockResolvedValueOnce(mockFarmsByState)
        .mockResolvedValueOnce(mockFarmsByHarvest)
        .mockResolvedValueOnce([mockLandUsage]);


      const result = await service.getDashboardData();
      expect(result).toEqual({
        totalFarms: mockTotalFarms,
        totalHectares: mockTotalHectares.total,
        farmsByState: mockFarmsByState,
        farmsByHarvest: mockFarmsByHarvest,
        landUsage: mockLandUsage,
      });
    });

    it('should handle no farms', async () => {
      jest.spyOn(farmRepository, 'count').mockResolvedValue(0);
      jest.spyOn(farmRepository.createQueryBuilder(), 'getRawOne').mockResolvedValue({ total: 0 });
      jest.spyOn(farmRepository.createQueryBuilder(), 'getRawMany')
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);

      const result = await service.getDashboardData();
      expect(result).toEqual({
        totalFarms: 0,
        totalHectares: 0,
        farmsByState: [],
        farmsByHarvest: [],
        landUsage: {
            total: 0,
        },
      });
    });
  });
});