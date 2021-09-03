import Reservation from "@/entities/Reservation";

export async function findReservation() {
  const reservation = await Reservation.find();

  return reservation;
}
