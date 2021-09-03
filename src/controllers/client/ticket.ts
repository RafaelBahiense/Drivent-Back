import { Request, Response } from "express";

import * as ticketService from "@/services/client/ticket";
//import TicketData from "@/interfaces/ticket";

export async function get(req: Request, res: Response) {
  const prices = await ticketService.getPrices();
  res.send(prices);
}
