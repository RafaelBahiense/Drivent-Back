import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/recovery";

export async function sendCode(req: Request, res: Response) {
  const email = req.body.email as string;
  const emailSent = await service.sendCodeByEmail(email);
  if (emailSent) {
    return res.sendStatus(httpStatus.OK);
  }
  res.sendStatus(httpStatus.NOT_FOUND);
}

export async function verifyCode(req: Request, res: Response) {
  const { email, code } = req.body as { email: string; code: string };
  const user = await service.userByValidCode(email, code);
  if (user) {
    return res.sendStatus(httpStatus.OK);
  }
  res.sendStatus(httpStatus.NOT_ACCEPTABLE);
}

export async function setPassword(req: Request, res: Response) {
  const { email, code, password } = req.body as {
    email: string;
    code: string;
    password: string;
  };
  if (await service.setNewPassword(email, code, password)) {
    return res.sendStatus(httpStatus.OK);
  }
  res.sendStatus(httpStatus.BAD_REQUEST);
}
