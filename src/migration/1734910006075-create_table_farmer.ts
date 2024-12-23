import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableFarmer1734910006075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS public.farmer_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            CREATE TABLE IF NOT EXISTS public.farmer (
                id integer NOT NULL DEFAULT nextval('farmer_id_seq'::regclass),
                cpf_cnpj VARCHAR(18) UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT farmer_pkey PRIMARY KEY (id)
            );

            ALTER SEQUENCE public.farmer_id_seq OWNED BY public.farmer.id;

            ALTER TABLE IF EXISTS public.farmer
                OWNER to postgres;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE IF EXISTS public.farmer;
            DROP SEQUENCE IF EXISTS public.farmer_id_seq;
        `)
    }

}
