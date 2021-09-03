import TicketPrice from "@/entities/TicketPrice";

//import TicketData from "@/interfaces/reservation";

export async function getPrices() {
  const prices = await TicketPrice.getPrices();
  let pricesObj = {};
  prices.forEach((item) => {
    pricesObj = { ...pricesObj, [item.name]: item.price };
  });
  return pricesObj;
}
