import { MigrationInterface, QueryRunner } from "typeorm";

export class AllowNullPaymentIdInReservation1631245633576 implements MigrationInterface {
    name = "AllowNullPaymentIdInReservation1631245633576"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_f8dbec76216ec5e4ef78cdecbcf\"");
      await queryRunner.query("ALTER TABLE \"reservations\" ALTER COLUMN \"paymentId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_f8dbec76216ec5e4ef78cdecbcf\" FOREIGN KEY (\"paymentId\") REFERENCES \"payments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_f8dbec76216ec5e4ef78cdecbcf\"");
      await queryRunner.query("ALTER TABLE \"reservations\" ALTER COLUMN \"paymentId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_f8dbec76216ec5e4ef78cdecbcf\" FOREIGN KEY (\"paymentId\") REFERENCES \"payments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
