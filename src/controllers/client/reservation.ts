import { Request, Response } from "express";
import httpStatus from "http-status";

import * as reservationService from "@/services/client/reservation";
import ReservationData from "@/interfaces/reservation";

export async function post(req: Request, res: Response) {
  const reservationData = req.body as ReservationData;
  reservationData.userId = req.user.id;
  await reservationService.createReservation(req.body);
  res.send(httpStatus.OK);
}
