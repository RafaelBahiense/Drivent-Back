import Ticket from "@/entities/Ticket";

export async function createTicket() {
  const ticket = Ticket.create({
    isPresencial: true,
    hasHotel: true,
    reservationId: 1
  });

  await ticket.save();
  
  return ticket;
}
