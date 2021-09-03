import Setting from "@/entities/Setting";

import ReservationData from "@/interfaces/reservation";

export async function createReservation(data: ReservationData) {
  return await Setting.getEventSettings(); //change to Reservation.createReservation
}
