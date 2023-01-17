import { MigrationInterface, QueryRunner } from "typeorm";

export class changesTypeRelationship1673976942498 implements MigrationInterface {
    name = 'changesTypeRelationship1673976942498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_6129aa5c0f65c073ea2f7452195"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "REL_6129aa5c0f65c073ea2f745219"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_6129aa5c0f65c073ea2f7452195" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_6129aa5c0f65c073ea2f7452195"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "REL_6129aa5c0f65c073ea2f745219" UNIQUE ("typeId")`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_6129aa5c0f65c073ea2f7452195" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
