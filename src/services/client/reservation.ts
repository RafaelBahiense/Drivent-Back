import Reservation from "@/entities/Reservation";
import Room from "@/entities/Room";

import ReservationData from "@/interfaces/reservation";

export async function createReservation(reservationData: ReservationData) {
  return await Reservation.createReservation(reservationData);
}

export async function findReservation(id: number) {
  const reservation = await Reservation.findOne({ userId: id });
  return reservation;
}

export async function insertRoomReservation(roomId: number, userId: number, changeRoom: number) {
  let reservation: boolean | Reservation = await Reservation.findOne({ where: { userId: userId } });
  if (!changeRoom && reservation.room?.id) return;

  const room: Room = await Room.findOne({ where: { id: roomId } });

  reservation = await removeRoomVacancyAndSaveReservation(room, reservation);
  if(!reservation) return;
  if (changeRoom) await refundRoomVacancy(changeRoom);
  return reservation;
}

async function refundRoomVacancy(changeRoom: number) {
  const roomToChange: Room = await Room.findOne({ where: { id: changeRoom } });
  roomToChange.availableBeds = roomToChange.availableBeds + 1;
  await roomToChange.save();
}

async function removeRoomVacancyAndSaveReservation(room: Room, reservation: Reservation): Promise<boolean | Reservation> {
  if (room.availableBeds < 1) return null;
  room.availableBeds = room.availableBeds - 1;
  await room.save();
  reservation.room = room;
  await reservation.save();
  return reservation;
}
