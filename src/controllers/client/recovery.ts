import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/recovery"; //recovery

export async function sendCode(req: Request, res: Response) {
  const email = req.body.email as string;
  if (await service.findUserByEmail(email)) {
    await service.sendCodeByEmail(email); // PODE FALHAR ? SE SIM FZR IF
    return res.status(httpStatus.OK).send(email);
  }
  res.status(httpStatus.NOT_FOUND);
}

export async function verifyCode(req: Request, res: Response) {
  const { email, code } = req.body as { email: string; code: string };
  const isValidCode = await service.isValideCode(email, code);
  if (isValidCode) {
    return res.status(httpStatus.OK);
  }
  res.status(httpStatus.NOT_ACCEPTABLE);
}

export async function setPassword(req: Request, res: Response) {
  const { email, code, password } = req.body as {
    email: string;
    code: string;
    password: string;
  };
  //chama service de mudança de senha
  res.status(httpStatus.OK);
}
