import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableHarvest1735309663177 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS public.harvest_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            CREATE TABLE IF NOT EXISTS public.harvest (
                id integer NOT NULL DEFAULT nextval('harvest_id_seq'::regclass),
                name VARCHAR(100) NOT NULL,
                year INT NOT NULL,
                cultivated_area NUMERIC(10, 2) NOT NULL,
                farm_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT harvest_pkey PRIMARY KEY (id),
                CONSTRAINT farm_fkey FOREIGN KEY (farm_id)
                    REFERENCES public.farm (id)
                    ON UPDATE NO ACTION
                    ON DELETE CASCADE
            );

            ALTER SEQUENCE public.harvest_id_seq OWNED BY public.harvest.id;

            ALTER TABLE IF EXISTS public.harvest
                OWNER to postgres;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE IF EXISTS public.harvest;
            DROP SEQUENCE IF EXISTS public.harvest_id_seq;
        `);
    }

}
