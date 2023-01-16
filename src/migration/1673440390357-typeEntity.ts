import { MigrationInterface, QueryRunner } from "typeorm";

export class typeEntity1673440390357 implements MigrationInterface {
    name = 'typeEntity1673440390357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_33b81de5358589c738907c3559b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "types"`);
    }

}