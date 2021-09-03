import { Router } from "express";

import * as controller from "@/controllers/client/reservation";

const router = Router();

router.get("/", controller.getReservation);
router.post("/", controller.saveReservation);

export default router;
