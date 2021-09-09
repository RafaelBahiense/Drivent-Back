import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateActivityUsers1631139008544 implements MigrationInterface {
    name = "GenerateActivityUsers1631139008544"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"activity_places\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_ae85fd635d68364acb1241867e2\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"user_activities\" (\"id\" SERIAL NOT NULL, \"userId\" integer NOT NULL, \"activityId\" integer NOT NULL, CONSTRAINT \"PK_1245d4d2cf04ba7743f2924d951\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"time\" TIME NOT NULL");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"activityPlaceId\" integer NOT NULL");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"totalSeats\" integer NOT NULL");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_8a1aa00d0a8a5f12ee5ac4da0dd\" FOREIGN KEY (\"activityPlaceId\") REFERENCES \"activity_places\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"user_activities\" ADD CONSTRAINT \"FK_951bc5ba19ed82cbbb852dbd124\" FOREIGN KEY (\"activityId\") REFERENCES \"activities\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"user_activities\" ADD CONSTRAINT \"FK_5618ade060df353e3965b759995\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"user_activities\" DROP CONSTRAINT \"FK_5618ade060df353e3965b759995\"");
      await queryRunner.query("ALTER TABLE \"user_activities\" DROP CONSTRAINT \"FK_951bc5ba19ed82cbbb852dbd124\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_8a1aa00d0a8a5f12ee5ac4da0dd\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"totalSeats\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"activityPlaceId\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"time\"");
      await queryRunner.query("DROP TABLE \"user_activities\"");
      await queryRunner.query("DROP TABLE \"activity_places\"");
    }
}
