import { MigrationInterface, QueryRunner } from "typeorm";

export class ticketPrice1630698592319 implements MigrationInterface {
    name = "ticketPrice1630698592319"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"ticket_prices\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"price\" integer NOT NULL, CONSTRAINT \"PK_a77beda837474792ca1309973c8\" PRIMARY KEY (\"id\"))");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("DROP TABLE \"ticket_prices\"");
    }
}
