import Payment from "@/entities/Payment";
import Reservation from "@/entities/Reservation";

export async function savePayment(value: number, reservationId: number) {
  const payment = await Payment.create();

  payment.value = value;
  payment.reservationId = reservationId;

  await payment.save();

  const reservation = await Reservation.findOne({ id: reservationId });
  reservation.paymentId = payment.id;
  reservation.payment = payment;
  reservation.save();
  return payment;
}
