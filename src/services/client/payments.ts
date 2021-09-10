import Payment from "@/entities/Payment";

export async function savePayment(value: number, reservationId: number) {
  const payment = await Payment.create();

  payment.value = value;
  payment.reservationId = reservationId;

  await payment.save();
  return payment;
}
