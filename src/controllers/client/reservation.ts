import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/reservation";
import ReservationData from "@/interfaces/reservation";

export async function createReservation(req: Request, res: Response) {
  const reservationData = req.body as ReservationData;
  reservationData.userId = req.user.id;
  const reservation = await service.createReservation(reservationData);
  res.status(httpStatus.OK).send(reservation);
}

export async function getReservation(req: Request, res: Response) {
  const userId = req.user.id;
  const reservation = await service.findReservation(userId);
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
