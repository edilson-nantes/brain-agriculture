import { FarmEntity } from "../../farm/entities/farm.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'farmer'})
export class FarmerEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'cpf_cnpj', nullable: false, unique: true})
    cpfCnpj: string;

    @Column({name: 'name', nullable: false})
    name: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => FarmEntity, (farm) => farm.farmer)
    farms?: FarmEntity[];

}