import { Request, Response } from "express";

import * as service from "@/services/client/activity";

export async function getActivitiesDaysList(req: Request, res: Response) {
  const activities = await service.getActivitiesDaysList();
  res.send(activities);
}

export async function saveActivityUserReservation(req: Request, res: Response) {
  const userId: number = req.user.id;
  const activityId: number = req.body.activityId;
  const userActivity = await service.saveActivityUserReservation(
    userId,
    activityId
  );
  console.log(userActivity);
  if (!userActivity) {
    console.log("entrou no null");
    return res.sendStatus(403);
  }
  return res.send(userActivity);
}
