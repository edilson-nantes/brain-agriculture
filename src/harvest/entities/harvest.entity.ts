import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FarmEntity } from "../../farm/entities/farm.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'harvest'})
export class HarvestEntity {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty({ example: 1, description: 'The ID of the harvest' })
    id: number;

    @Column({name: 'name', nullable: false})
    @ApiProperty({ example: 'Harvest 1', description: 'The name of the harvest' })
    name: string;

    @Column({name: 'year', nullable: false})
    @ApiProperty({ example: 2021, description: 'The year of the harvest' })
    year: number;

    @Column({name: 'cultivated_area', nullable: false})
    @ApiProperty({ example: 50, description: 'The cultivated area of the harvest in hectares' })
    cultivatedArea: number;

    @Column({name: 'farm_id', nullable: false})
    @ApiProperty({ example: 1, description: 'The ID of the farm where the harvest was cultivated' })
    farmId: number;

    @CreateDateColumn({name: 'created_at'})
    @ApiProperty({ example: '2021-10-01T00:00:00.000Z', description: 'The date when the harvest was created' })
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    @ApiProperty({ example: '2021-10-01T00:00:00.000Z', description: 'The date when the harvest was updated' })
    updatedAt: Date;

    @ManyToOne(() => FarmEntity, (farm) => farm.harvests)
    @JoinColumn({name: 'farm_id', referencedColumnName: 'id'})
    farm?: FarmEntity;
}