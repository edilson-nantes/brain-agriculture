import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableFarm1734989553807 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS public.farm_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            CREATE TABLE IF NOT EXISTS public.farm (
                id integer NOT NULL DEFAULT nextval('farm_id_seq'::regclass),
                name VARCHAR(255) NOT NULL,
                city_id INTEGER NOT NULL,
                state_id INTEGER NOT NULL,
                total_area NUMERIC(10, 2) NOT NULL,
                arable_area NUMERIC(10, 2) NOT NULL,
                vegetation_area NUMERIC(10, 2) NOT NULL,
                farmer_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT farm_pkey PRIMARY KEY (id),
                CONSTRAINT farmer_fkey FOREIGN KEY (farmer_id)
                    REFERENCES public.farmer (id)
                    ON UPDATE NO ACTION
                    ON DELETE CASCADE
            );

            ALTER SEQUENCE public.farm_id_seq OWNED BY public.farm.id;

            ALTER TABLE IF EXISTS public.farm
                OWNER to postgres;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE IF EXISTS public.farm;
            DROP SEQUENCE IF EXISTS public.farm_id_seq;
        `);
    }

}
