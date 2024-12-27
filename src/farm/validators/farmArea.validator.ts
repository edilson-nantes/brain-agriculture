import { BadRequestException } from "@nestjs/common";

export class FarmAreaValidator {
    static validateFarmArea(arableArea: number, vegetationArea: number, totalArea: number): void {
        if (arableArea < 0 || vegetationArea < 0 || totalArea < 0) {
            throw new BadRequestException('The areas cannot be negative');
        }

        if (arableArea + vegetationArea > totalArea) {
            throw new BadRequestException('The sum of agricultable and vegetation areas cannot exceed the total area');
        }
    }
}