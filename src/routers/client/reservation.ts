import { Router } from "express";

import * as controller from "@/controllers/client/reservation";

const router = Router();

router.get("/", controller.getReservation);

export default router;
