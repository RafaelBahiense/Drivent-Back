import Reservation from "@/entities/Reservation";

export async function createReservation(userId: number, ticketId: number, paymentId: number) {
  const reservation = Reservation.create({
    userId,
    ticketId,
    roomId: null,
    paymentId,
  });

  await reservation.save();
  
  return reservation;
}
