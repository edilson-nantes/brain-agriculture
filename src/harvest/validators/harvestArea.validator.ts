import { BadRequestException } from "@nestjs/common";

export class HarvestAreaValidator {
    static validateHarvestArea(cultivatedArea: number, arableArea: number): void {
        if (cultivatedArea < 0 || arableArea < 0) {
            throw new BadRequestException('The areas cannot be negative');
        }

        if (cultivatedArea > arableArea) {
            throw new BadRequestException('The cultivated area cannot exceed the arable area');
        }
    }
}