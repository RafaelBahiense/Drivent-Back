import { MigrationInterface, QueryRunner } from "typeorm";

export class AllowNullRoomIdInReservation1631158771223 implements MigrationInterface {
    name = "AllowNullRoomIdInReservation1631158771223"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\"");
      await queryRunner.query("ALTER TABLE \"reservations\" ALTER COLUMN \"roomId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\"");
      await queryRunner.query("ALTER TABLE \"reservations\" ALTER COLUMN \"roomId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
