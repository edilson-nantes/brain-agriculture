import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableCity1734988423952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS public.city_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
            
            CREATE TABLE IF NOT EXISTS public.city (
                id integer NOT NULL DEFAULT nextval('public.city_id_seq'),
                state_id integer NOT NULL,
                name character varying NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                CONSTRAINT city_pkey PRIMARY KEY (id),
                CONSTRAINT state_fkey FOREIGN KEY (state_id)
                    REFERENCES public.state (id)
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
            );

            ALTER SEQUENCE public.city_id_seq OWNED BY public.city.id;

            ALTER TABLE IF EXISTS public.city
                OWNER TO postgres;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS public.city;
            DROP SEQUENCE IF EXISTS public.city_id_seq;
        `);
    }

}
