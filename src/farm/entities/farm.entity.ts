import { FarmerEntity } from "../../farmer/entities/farmer.entity";
import { HarvestEntity } from "../../harvest/entities/harvest.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'farm'})
export class FarmEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'city', nullable: false})
    city: string;

    @Column({name: 'state', nullable: false})
    state: string;

    @Column({name: 'total_area', nullable: false})
    totalArea: number;

    @Column({name: 'arable_area', nullable: false})
    arableArea: number;

    @Column({name: 'vegetation_area', nullable: false})
    vegetationArea: number;

    @Column({name: 'farmer_id', nullable: false})
    farmerId: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => FarmerEntity, (farmer) => farmer.farms)
    @JoinColumn({name: 'farmer_id', referencedColumnName: 'id'})
    farmer?: FarmerEntity;

    @OneToMany(() => HarvestEntity, (harvest) => harvest.farm)
    harvests?: HarvestEntity[];
}