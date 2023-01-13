import { MigrationInterface, QueryRunner } from "typeorm";

export class orderEntity1673441919590 implements MigrationInterface {
    name = 'orderEntity1673441919590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('concluido', 'em andamento')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "value" numeric(12,2) NOT NULL, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'em andamento', "userId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    }

}
