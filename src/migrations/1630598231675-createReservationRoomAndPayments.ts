import { MigrationInterface, QueryRunner } from "typeorm";

export class createReservationRoomAndPayments1630598231675 implements MigrationInterface {
    name = "createReservationRoomAndPayments1630598231675"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"rooms\" (\"id\" SERIAL NOT NULL, \"number\" character varying NOT NULL, \"capacity\" integer NOT NULL, \"availableBeds\" integer NOT NULL, \"hotelId\" integer, CONSTRAINT \"PK_0368a2d7c215f2d0458a54933f2\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"hotels\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"image\" character varying NOT NULL, CONSTRAINT \"PK_2bb06797684115a1ba7c705fc7b\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"tickets\" (\"id\" SERIAL NOT NULL, \"isPresencial\" boolean NOT NULL, \"hasHotel\" boolean NOT NULL, \"reservationId\" integer NOT NULL, CONSTRAINT \"PK_343bc942ae261cf7a1377f48fd0\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"reservations\" (\"id\" SERIAL NOT NULL, \"userId\" integer NOT NULL, \"ticketId\" integer NOT NULL, \"roomId\" integer NOT NULL, \"paymentId\" integer NOT NULL, CONSTRAINT \"REL_aa0e1cc2c4f54da32bf8282154\" UNIQUE (\"userId\"), CONSTRAINT \"REL_d7dbf48ad681965ca77e3cbde1\" UNIQUE (\"ticketId\"), CONSTRAINT \"REL_f8dbec76216ec5e4ef78cdecbc\" UNIQUE (\"paymentId\"), CONSTRAINT \"PK_da95cef71b617ac35dc5bcda243\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"payments\" (\"id\" SERIAL NOT NULL, \"reservationId\" integer NOT NULL, \"value\" integer NOT NULL, \"date\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_197ab7af18c93fbb0c9b28b4a59\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_aa0e1cc2c4f54da32bf8282154c\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_d7dbf48ad681965ca77e3cbde13\" FOREIGN KEY (\"ticketId\") REFERENCES \"tickets\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_f8dbec76216ec5e4ef78cdecbcf\" FOREIGN KEY (\"paymentId\") REFERENCES \"payments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_f8dbec76216ec5e4ef78cdecbcf\"");
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\"");
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_d7dbf48ad681965ca77e3cbde13\"");
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_aa0e1cc2c4f54da32bf8282154c\"");
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("DROP TABLE \"payments\"");
      await queryRunner.query("DROP TABLE \"reservations\"");
      await queryRunner.query("DROP TABLE \"tickets\"");
      await queryRunner.query("DROP TABLE \"hotels\"");
      await queryRunner.query("DROP TABLE \"rooms\"");
    }
}
