import { MigrationInterface, QueryRunner } from "typeorm";

export class RecoveryTable1631743521641 implements MigrationInterface {
    name = "RecoveryTable1631743521641"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"recoveries\" (\"id\" SERIAL NOT NULL, \"userId\" integer NOT NULL, \"code\" character varying NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_7f7fdc38ebfdfdaa075d0ae0a1a\" PRIMARY KEY (\"id\"))");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("DROP TABLE \"recoveries\"");
    }
}
