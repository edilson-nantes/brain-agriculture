import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableState1734988340687 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS public.state_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
            
            CREATE TABLE IF NOT EXISTS public.state (
                id integer NOT NULL DEFAULT nextval('public.state_id_seq'),
                name character varying NOT NULL,
                uf varchar(2) NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                CONSTRAINT "state_pkey" PRIMARY KEY (id)
            );

            ALTER SEQUENCE public.state_id_seq OWNED BY public.state.id;

            ALTER TABLE IF EXISTS public.state
                OWNER TO postgres;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS public.state;
            DROP SEQUENCE IF EXISTS public.state_id_seq;
        `);
    }

}
