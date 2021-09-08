import Reservation from "@/entities/Reservation";
import Room from "@/entities/Room";

import ReservationData from "@/interfaces/reservation";

export async function createReservation(reservationData: ReservationData) {
  return await Reservation.createReservation(reservationData);
}

export async function findReservationByUser(userId: number) {
  const reservation = await Reservation.findOne({ where: { userId } });
  return reservation;
}

export async function findReservations() {
  const reservation = await Reservation.find();
  return reservation;
}

export async function updateReservation(roomId: number, userId: number) {
  const reservation = await Reservation.findOne({ where: { userId: userId } });
  const room: Room = await Room.findOne({ where: { id: roomId } });
  room.availableBeds = room.availableBeds - 1;
  await room.save();
  reservation.room = room;
  await reservation.save();
  return reservation;
}
