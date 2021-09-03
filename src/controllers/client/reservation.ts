import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/reservation";

export async function getReservation(req: Request, res: Response) {
  const reservation = await service.findReservation();
  res.status(httpStatus.OK).send(reservation);
}
