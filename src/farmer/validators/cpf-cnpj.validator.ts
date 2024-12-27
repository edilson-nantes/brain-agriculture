import { BadRequestException, Logger } from '@nestjs/common';
import validator from 'cpf-cnpj-validator';
const Joi = require('joi').extend(validator);

export class CpfCnpjValidator {
    private static logger = new Logger(CpfCnpjValidator.name);

    static validate(cpfCnpj: string): void {
        const cpfSchema = Joi.document().cpf();
        const cnpjSchema = Joi.document().cnpj();

        if (cpfCnpj.length === 14) {
            const { error } = cnpjSchema.validate(cpfCnpj);
            if (error) {
                this.logger.error('Invalid CNPJ');
                throw new BadRequestException('Invalid CNPJ');
            }
        } else if (cpfCnpj.length === 11) {
            const { error } = cpfSchema.validate(cpfCnpj);
            if (error) {
                this.logger.error('Invalid CPF');
                throw new BadRequestException('Invalid CPF');
            }
        } else {
            this.logger.error('Invalid CPF/CNPJ length');
            throw new BadRequestException('Invalid CPF/CNPJ length');
        }
    }
}