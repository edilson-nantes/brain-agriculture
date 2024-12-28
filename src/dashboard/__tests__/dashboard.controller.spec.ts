import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from '../dashboard.controller';
import { DashboardService } from '../dashboard.service';
import { mockTotalFarms, mockTotalHectares, mockFarmsByState, mockFarmsByHarvest, mockLandUsage } from '../__mocks__/dashboard.mock';

const mockDashboardService = () => ({
  getDashboardData: jest.fn(),
});

describe('DashboardController', () => {
  let controller: DashboardController;
  let service: DashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: DashboardService,
          useFactory: mockDashboardService,
        },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDashboardData', () => {
    it('should return dashboard data', async () => {
      jest.spyOn(service, 'getDashboardData').mockResolvedValue({
        totalFarms: mockTotalFarms,
        totalHectares: mockTotalHectares.total,
        farmsByState: mockFarmsByState,
        farmsByHarvest: mockFarmsByHarvest,
        landUsage: mockLandUsage,
      });

      const result = await controller.getDashboardData();
      expect(result).toEqual({
        totalFarms: mockTotalFarms,
        totalHectares: mockTotalHectares.total,
        farmsByState: mockFarmsByState,
        farmsByHarvest: mockFarmsByHarvest,
        landUsage: mockLandUsage,
      });
      expect(service.getDashboardData).toHaveBeenCalled();
    });

    it('should handle no farms', async () => {
      jest.spyOn(service, 'getDashboardData').mockResolvedValue({
        totalFarms: 0,
        totalHectares: 0,
        farmsByState: [],
        farmsByHarvest: [],
        landUsage: [],
      });

      const result = await controller.getDashboardData();
      expect(result).toEqual({
        totalFarms: 0,
        totalHectares: 0,
        farmsByState: [],
        farmsByHarvest: [],
        landUsage: [],
      });
      expect(service.getDashboardData).toHaveBeenCalled();
    });
  });
});