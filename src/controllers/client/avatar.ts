import { Request, Response } from "express";
import * as service from "@/services/client/avatar";

export async function postProfilePicture(req: Request, res: Response) {
  const userId: number = req.user.id;
  const url: string = req.body.pictureUrl;
  const profilePicture = await service.postProfilePicture(userId, url);
  return res.sendStatus(200);
}
