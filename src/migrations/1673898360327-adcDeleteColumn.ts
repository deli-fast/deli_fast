import { MigrationInterface, QueryRunner } from "typeorm";

export class adcDeleteColumn1673898360327 implements MigrationInterface {
    name = 'adcDeleteColumn1673898360327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "deleteAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "telephone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "telephone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "deleteAt"`);
    }

}
