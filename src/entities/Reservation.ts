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

import ReservationData from "@/interfaces/reservation";

@Entity("reservations")
export default class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  ticketId: number;

  @Column({ nullable: true })
  roomId: number;

  @Column({ nullable: true })
  paymentId: number;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @OneToOne(() => Ticket, (ticket) => ticket.reservation, { eager: true })
  @JoinColumn()
  ticket: Ticket;

  @ManyToOne(() => Room, { eager: true })
  room: Room;

  @OneToOne(() => Payment, (payment) => payment.reservation, { eager: true })
  @JoinColumn()
  payment: Payment;

  static async createReservation(data: ReservationData) {
    const reservation = this.create();
    reservation.userId = data.userId;

    await reservation.save();

    reservation.ticket = new Ticket();
    reservation.ticket.isPresencial = data.isPresencial;
    reservation.ticket.hasHotel = data.hasHotel;
    reservation.ticket.reservationId = reservation.id;

    await reservation.ticket.save();

    reservation.ticketId = reservation.ticket.id;

    await reservation.save();

    return reservation;
  }
}
