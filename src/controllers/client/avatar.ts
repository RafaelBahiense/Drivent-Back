import { Request, Response } from "express";
import * as service from "@/services/client/avatar";

export async function postProfilePicture(req: Request, res: Response) {
  const userId: number = req.user.id;
  const url: string = req.body.pictureUrl;
  if (!verifyIfBase64(url)) {
    return res.sendStatus(406);
  }
  await service.postProfilePicture(userId, url);
  return res.sendStatus(200);
}

function verifyIfBase64(url: string) {
  const indexAfter: number = url.indexOf(",");
  const regex =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  const urlIsImage = regex.test(url.slice(indexAfter + 1));
  if (!urlIsImage) return false;
  return true;
}
