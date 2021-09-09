import { MigrationInterface, QueryRunner } from "typeorm";

export class changedEventDayTableName1631157826088 implements MigrationInterface {
    name = "changedEventDayTableName1631157826088"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_4cfa6561a3127b224e5c3ff2c1e\"");
      await queryRunner.query("CREATE TABLE \"event_day\" (\"id\" SERIAL NOT NULL, \"date\" date NOT NULL, CONSTRAINT \"PK_56540a2aefa8bbfbe826dcd06e8\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_4cfa6561a3127b224e5c3ff2c1e\" FOREIGN KEY (\"eventDayId\") REFERENCES \"event_day\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_4cfa6561a3127b224e5c3ff2c1e\"");
      await queryRunner.query("DROP TABLE \"event_day\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_4cfa6561a3127b224e5c3ff2c1e\" FOREIGN KEY (\"eventDayId\") REFERENCES \"eventDay\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
