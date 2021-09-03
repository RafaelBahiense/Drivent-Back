import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from "typeorm";
import Reservation from "./Reservation";

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isPresencial: boolean;

  @Column()
  hasHotel: boolean;

  @Column()
  reservationId: number;

  @OneToOne(() => Reservation)
  reservation: Reservation;
}
