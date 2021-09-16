import Payment from "@/entities/Payment";

export async function createPayment() {
  const payment = Payment.create({
    reservationId: 1,
    value: 35000,
    date: new Date()
  });

  await payment.save();
  
  return payment;
}