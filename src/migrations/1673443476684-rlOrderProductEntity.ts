import { MigrationInterface, QueryRunner } from "typeorm";

export class rlOrderProductEntity1673443476684 implements MigrationInterface {
    name = 'rlOrderProductEntity1673443476684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rl_order_product" ("id" SERIAL NOT NULL, "orderId" integer, "productId" integer, CONSTRAINT "PK_170ba7740e7dcdb61a7dafec7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rl_order_product" ADD CONSTRAINT "FK_3c28e69acd3ff397b7d88a9c924" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rl_order_product" ADD CONSTRAINT "FK_b04214f8b798e4f317598792ea1" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rl_order_product" DROP CONSTRAINT "FK_b04214f8b798e4f317598792ea1"`);
        await queryRunner.query(`ALTER TABLE "rl_order_product" DROP CONSTRAINT "FK_3c28e69acd3ff397b7d88a9c924"`);
        await queryRunner.query(`DROP TABLE "rl_order_product"`);
    }

}
