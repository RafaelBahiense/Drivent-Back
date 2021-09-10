import { Request, Response } from "express";

import * as service from "@/services/client/activity";

export async function get(req: Request, res: Response) {
  const activities = await service.getActivitiesDaysList();
  res.send(activities);
}
