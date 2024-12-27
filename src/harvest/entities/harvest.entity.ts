import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FarmEntity } from "../../farm/entities/farm.entity";

@Entity({name: 'harvest'})
export class HarvestEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'year', nullable: false})
    year: number;

    @Column({name: 'cultivated_area', nullable: false})
    cultivatedArea: number;

    @Column({name: 'farm_id', nullable: false})
    farmId: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => FarmEntity, (farm) => farm.harvests)
    @JoinColumn({name: 'farm_id', referencedColumnName: 'id'})
    farm?: FarmEntity;
}