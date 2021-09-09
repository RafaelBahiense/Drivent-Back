import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Payment from "./Payment";
import Room from "./Room";
import Ticket from "./Ticket";
import User from "./User";

@Entity("reservations")
export default class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  ticketId: number;

  @Column({ nullable: true })
  roomId: number;

  @Column()
  paymentId: number;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @OneToOne(() => Ticket, (ticket) => ticket.reservation, { eager: true })
  @JoinColumn()
  ticket: Ticket;

  @ManyToOne(() => Room, { eager: true })
  room: Room;

  @OneToOne(() => Payment, payment => payment.reservation, { eager: true })
  @JoinColumn()
  payment: Payment;
}
