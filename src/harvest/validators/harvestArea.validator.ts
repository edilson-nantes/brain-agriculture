import { BadRequestException, Logger } from "@nestjs/common";

export class HarvestAreaValidator {
    private static logger = new Logger(HarvestAreaValidator.name);

    static validateHarvestArea(cultivatedArea: number, arableArea: number): void {
        if (cultivatedArea < 0 || arableArea < 0) {
            this.logger.error('The areas cannot be negative');
            throw new BadRequestException('The areas cannot be negative');
        }

        if (cultivatedArea > arableArea) {
            this.logger.error('The cultivated area cannot exceed the arable area');
            throw new BadRequestException('The cultivated area cannot exceed the arable area');
        }
    }
}