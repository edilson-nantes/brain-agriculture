import { BadRequestException, Logger } from "@nestjs/common";

export class FarmAreaValidator {
    private static readonly logger = new Logger(FarmAreaValidator.name);

    static validateFarmArea(arableArea: number, vegetationArea: number, totalArea: number): void {
        if (arableArea < 0 || vegetationArea < 0 || totalArea < 0) {
            this.logger.error('The areas cannot be negative');
            throw new BadRequestException('The areas cannot be negative');
        }

        if (arableArea + vegetationArea > totalArea) {
            this.logger.error('The sum of agricultable and vegetation areas cannot exceed the total area');
            throw new BadRequestException('The sum of agricultable and vegetation areas cannot exceed the total area');
        }
    }
}