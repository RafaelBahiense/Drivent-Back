import Reservation from "@/entities/Reservation";

import ReservationData from "@/interfaces/reservation";

export async function createReservation(reservationData: ReservationData) {
  await Reservation.createReservation(reservationData);
}
