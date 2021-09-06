import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/reservation";

export async function getReservation(req: Request, res: Response) {
  const { id } = req.user;
  const reservation = await service.findReservation(id);
  res.status(httpStatus.OK).send(reservation);
}

export async function saveReservation(req: Request, res: Response) {
  const { roomId } = req.body;
  const { id } = req.user;
  if (!roomId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  const reservation = await service.saveReservation(roomId, id);
  res.status(httpStatus.OK).send(reservation);
}
