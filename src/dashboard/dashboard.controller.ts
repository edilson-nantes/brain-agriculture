import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get()
    @ApiOperation({ summary: 'Get dashboard data' })
    @ApiResponse({ status: 200, description: 'Dashboard data.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async getDashboardData(): Promise<any> {
        return await this.dashboardService.getDashboardData();
    }
}