import { BadRequestException } from '@nestjs/common';
import validator from 'cpf-cnpj-validator';
const Joi = require('joi').extend(validator);

export class CpfCnpjValidator {
    static validate(cpfCnpj: string): void {
        const cpfSchema = Joi.document().cpf();
        const cnpjSchema = Joi.document().cnpj();

        if (cpfCnpj.length === 14) {
            const { error } = cnpjSchema.validate(cpfCnpj);
            if (error) {
                throw new BadRequestException('Invalid CNPJ');
            }
        } else if (cpfCnpj.length === 11) {
            const { error } = cpfSchema.validate(cpfCnpj);
            if (error) {
                throw new BadRequestException('Invalid CPF');
            }
        } else {
            throw new BadRequestException('Invalid CPF/CNPJ length');
        }
    }
}