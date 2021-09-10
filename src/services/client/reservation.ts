import Reservation from "@/entities/Reservation";
import Room from "@/entities/Room";

import ReservationData from "@/interfaces/reservation";

export async function createReservation(reservationData: ReservationData) {
  return await Reservation.createReservation(reservationData);
}

export async function findReservation(id: number) {
  const reservation = await Reservation.findOne( { userId: id } );
  return reservation;
}

export async function insertRoomReservation(roomId: number, userId: number) {
  const reservation = await Reservation.findOne( { userId: userId } );
  const room: Room = await Room.findOne( { id: roomId } );
  room.availableBeds = room.availableBeds - 1;
  await room.save();
  reservation.room = room;
  await reservation.save();
  return reservation;
}
