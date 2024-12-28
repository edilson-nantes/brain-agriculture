import { ApiProperty } from "@nestjs/swagger";
import { FarmEntity } from "../../farm/entities/farm.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'farmer'})
export class FarmerEntity {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty({ example: 1, description: 'The ID of the farmer' })
    id: number;

    @Column({name: 'cpf_cnpj', nullable: false, unique: true})
    @ApiProperty({ example: '12345678901', description: 'The CPF or CNPJ of the farmer' })
    cpfCnpj: string;

    @Column({name: 'name', nullable: false})
    @ApiProperty({ example: 'Joe', description: 'The name of the farmer' })
    name: string;

    @CreateDateColumn({name: 'created_at'})
    @ApiProperty({ example: '2021-10-01T00:00:00.000Z', description: 'The date when the farmer was created' })
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    @ApiProperty({ example: '2021-10-01T00:00:00.000Z', description: 'The date when the farmer was updated' })
    updatedAt: Date;

    @OneToMany(() => FarmEntity, (farm) => farm.farmer)
    @ApiProperty({ type: [FarmEntity], description: 'The farms of the farmer' })
    farms?: FarmEntity[];

}