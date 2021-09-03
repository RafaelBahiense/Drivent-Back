import { Request, Response } from "express";
import * as service from "@/services/client/hotel";

export async function getHotelInfo(req: Request, res: Response) {
  const hotelInfo = await service.getHotelInfo();
  res.send(hotelInfo);
}
