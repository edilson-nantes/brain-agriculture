import { ApiProperty } from "@nestjs/swagger";
import { FarmerEntity } from "../../farmer/entities/farmer.entity";
import { HarvestEntity } from "../../harvest/entities/harvest.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'farm'})
export class FarmEntity {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty({ example: 1, description: 'The ID of the farm' })
    id: number;

    @Column({name: 'name', nullable: false})
    @ApiProperty({ example: 'Farm 1', description: 'The name of the farm' })
    name: string;

    @Column({name: 'city', nullable: false})
    @ApiProperty({ example: 'City 1', description: 'The city of the farm' })
    city: string;

    @Column({name: 'state', nullable: false})
    @ApiProperty({ example: 'State 1', description: 'The state of the farm' })
    state: string;

    @Column({name: 'total_area', nullable: false})
    @ApiProperty({ example: 100, description: 'The total area of the farm in hectares' })
    totalArea: number;

    @Column({name: 'arable_area', nullable: false})
    @ApiProperty({ example: 50, description: 'The arable area of the farm in hectares' })
    arableArea: number;

    @Column({name: 'vegetation_area', nullable: false})
    @ApiProperty({ example: 50, description: 'The vegetation area of the farm in hectares' })
    vegetationArea: number;

    @Column({name: 'farmer_id', nullable: false})
    @ApiProperty({ example: 1, description: 'The ID of the farmer' })
    farmerId: number;

    @CreateDateColumn({name: 'created_at'})
    @ApiProperty({ example: '2021-10-01T00:00:00.000Z', description: 'The date when the farm was created' })
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    @ApiProperty({ example: '2021-10-01T00:00:00.000Z', description: 'The date when the farm was updated' })
    updatedAt: Date;

    @ManyToOne(() => FarmerEntity, (farmer) => farmer.farms)
    @JoinColumn({name: 'farmer_id', referencedColumnName: 'id'})
    farmer?: FarmerEntity;

    @OneToMany(() => HarvestEntity, (harvest) => harvest.farm)
    @ApiProperty({ type: [HarvestEntity], description: 'The harvests of the farm' })
    harvests?: HarvestEntity[];
}