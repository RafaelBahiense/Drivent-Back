import { Router } from "express";

import * as controller from "@/controllers/client/activity";

const router = Router();

router.get("/", controller.getActivitiesDaysList);
router.post("/", controller.saveActivityUserReservation);
router.post("/delete", controller.deleteActivityUserReservation);
export default router;
