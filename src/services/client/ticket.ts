import TicketPrice from "@/entities/TicketPrice";

export async function getPrices() {
  const prices = await TicketPrice.getPrices();
  let pricesObj = {};
  prices.forEach((item) => {
    pricesObj = { ...pricesObj, [item.name]: item.price };
  });
  return pricesObj;
}
