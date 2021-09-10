import { Request, Response } from "express";
import httpStatus from "http-status";

import * as reservationService from "@/services/client/reservation";
import ReservationData from "@/interfaces/reservation";

export async function createReservation(req: Request, res: Response) {
  const reservationData = req.body as ReservationData;
  reservationData.userId = req.user.id;
  const reservation = await reservationService.createReservation(reservationData);
  res.status(httpStatus.OK).send(reservation);
}

export async function getReservation(req: Request, res: Response) {
  const userId = req.user.id;
  const reservation = await reservationService.findReservation(userId);
  res.status(httpStatus.OK).send(reservation);
}

export async function insertRoomReservation(req: Request, res: Response) {
  const { roomId } = req.body;
  const { id } = req.user;
  if (!roomId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  const reservation = await reservationService.insertRoomReservation(roomId, id);
  res.status(httpStatus.OK).send(reservation);
}
