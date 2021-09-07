import { MigrationInterface, QueryRunner } from "typeorm";

export class EventDayAndActivityEntitiesCreation1631038108897 implements MigrationInterface {
    name = "EventDayAndActivityEntitiesCreation1631038108897"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"eventDay\" (\"id\" SERIAL NOT NULL, \"date\" date NOT NULL, CONSTRAINT \"PK_b6628cc691b3d17028c3d70717c\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"activities\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"duration\" integer NOT NULL, \"eventDayId\" integer NOT NULL, CONSTRAINT \"PK_7f4004429f731ffb9c88eb486a8\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_4cfa6561a3127b224e5c3ff2c1e\" FOREIGN KEY (\"eventDayId\") REFERENCES \"eventDay\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_4cfa6561a3127b224e5c3ff2c1e\"");
      await queryRunner.query("DROP TABLE \"activities\"");
      await queryRunner.query("DROP TABLE \"eventDay\"");
    }
}
