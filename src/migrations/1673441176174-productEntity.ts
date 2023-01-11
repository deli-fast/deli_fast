import { MigrationInterface, QueryRunner } from "typeorm";

export class productEntity1673441176174 implements MigrationInterface {
    name = 'productEntity1673441176174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "stock" integer NOT NULL, "typeId" uuid, CONSTRAINT "REL_6129aa5c0f65c073ea2f745219" UNIQUE ("typeId"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_6129aa5c0f65c073ea2f7452195" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_6129aa5c0f65c073ea2f7452195"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
