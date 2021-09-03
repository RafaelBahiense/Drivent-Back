import TicketPrice from "@/entities/TicketPrice";

//import TicketData from "@/interfaces/reservation";

export async function getPrices() {
  const prices = await TicketPrice.getPrices();
}
