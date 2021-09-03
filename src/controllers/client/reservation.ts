import { Request, Response } from "express";

import * as service from "@/services/client/reservation";

export async function post(req: Request, res: Response) {
  const reservation = await service.createReservation(req.body);
  res.send(reservation);
}
