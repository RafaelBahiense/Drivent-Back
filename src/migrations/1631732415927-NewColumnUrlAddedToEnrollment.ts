import { MigrationInterface, QueryRunner } from "typeorm";

export class NewColumnUrlAddedToEnrollment1631732415927 implements MigrationInterface {
    name = "NewColumnUrlAddedToEnrollment1631732415927"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD \"url\" character varying");
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_d7dbf48ad681965ca77e3cbde13\"");
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\"");
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_f8dbec76216ec5e4ef78cdecbcf\"");
      await queryRunner.query("ALTER TABLE \"reservations\" ALTER COLUMN \"ticketId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"reservations\" ALTER COLUMN \"roomId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"reservations\" ALTER COLUMN \"paymentId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_d7dbf48ad681965ca77e3cbde13\" FOREIGN KEY (\"ticketId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_f8dbec76216ec5e4ef78cdecbcf\" FOREIGN KEY (\"paymentId\") REFERENCES \"payments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_f8dbec76216ec5e4ef78cdecbcf\"");
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\"");
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_d7dbf48ad681965ca77e3cbde13\"");
      await queryRunner.query("ALTER TABLE \"reservations\" ALTER COLUMN \"paymentId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"reservations\" ALTER COLUMN \"roomId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"reservations\" ALTER COLUMN \"ticketId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_f8dbec76216ec5e4ef78cdecbcf\" FOREIGN KEY (\"paymentId\") REFERENCES \"payments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_d7dbf48ad681965ca77e3cbde13\" FOREIGN KEY (\"ticketId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP COLUMN \"url\"");
    }
}
