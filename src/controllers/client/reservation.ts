import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/reservation";

export async function getReservation(req: Request, res: Response) {
  const { id } = req.user;
  const reservation = await service.findReservation(id);
  res.status(httpStatus.OK).send(reservation);
}

export async function insertRoomReservation(req: Request, res: Response) {
  const { roomId, changeRoom } = req.body;
  const { id } = req.user;
  if (!roomId || !id) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  const reservation = await service.insertRoomReservation(roomId, id, changeRoom);
  if(!reservation) {
    return res.sendStatus(httpStatus.FORBIDDEN); 
  }
  res.status(httpStatus.OK).send(reservation);
}
