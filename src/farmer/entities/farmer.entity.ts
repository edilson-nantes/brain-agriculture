import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'farmer'})
export class FarmerEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'cpf_cnpj'})
    cpfCpnj: string;

    @Column({name: 'name'})
    name: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

}