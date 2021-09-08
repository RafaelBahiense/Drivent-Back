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

export async function getReservationByUser(req: Request, res: Response) {
  const userId = req.user.id;
  const reservation = await reservationService.findReservationByUser(userId);
  res.status(httpStatus.OK).send(reservation);
}

export async function getReservations(req: Request, res: Response) {
  const reservation = await reservationService.findReservations();
  res.status(httpStatus.OK).send(reservation);
}

export async function saveReservation(req: Request, res: Response) {
  const { roomId } = req.body;
  const { id } = req.user;
  if (!roomId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  const reservation = await reservationService.updateReservation(roomId, id);
  res.status(httpStatus.OK).send(reservation);
}
