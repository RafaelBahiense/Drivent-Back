import Reservation from "@/entities/Reservation";
import Room from "@/entities/Room";

export async function findReservation() {
  const reservation = await Reservation.find();

  return reservation;
}

export async function saveReservation(roomId: number, userId: number) {
  const reservation = await Reservation.findOne({ where: { userId: userId } });
  const room: Room = await Room.findOne({ where: { id: roomId } });
  room.availableBeds = room.availableBeds - 1;
  await room.save();
  reservation.room = room;
  await reservation.save();
  return reservation;
}
