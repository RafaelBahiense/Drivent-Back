import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/payments";

export async function savePayment(req: Request, res: Response) {
  const { value, reservationId } = req.body;
  const { id } = req.user;
  if (!value || !reservationId || !id) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  const payment = await service.savePayment(value, reservationId);
  if(!payment) {
    return res.sendStatus(httpStatus.FORBIDDEN); 
  }
  res.status(httpStatus.OK).send(payment);
}
