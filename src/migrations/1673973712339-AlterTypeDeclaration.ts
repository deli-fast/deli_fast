import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTypeDeclaration1673973712339 implements MigrationInterface {
    name = 'AlterTypeDeclaration1673973712339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "status" character varying NOT NULL DEFAULT 'EM ANDAMENTO'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "telephone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."users_type_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "type" character varying NOT NULL DEFAULT 'NORMAL'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."users_type_enum" AS ENUM('admin', 'deliveryman', 'normal')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "type" "public"."users_type_enum" NOT NULL DEFAULT 'normal'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "telephone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('concluido', 'em andamento')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "status" "public"."orders_status_enum" NOT NULL DEFAULT 'em andamento'`);
    }

}
