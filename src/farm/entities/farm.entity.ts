import { FarmerEntity } from "src/farmer/entities/farmer.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'farm'})
export class FarmEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'city_id', nullable: false}) // ajustar para o retorno do IBGE
    cityId: number;

    @Column({name: 'state_id', nullable: false}) // ajustar para o retorno do IBGE
    stateId: number;

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
}