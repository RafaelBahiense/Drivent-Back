import { Router } from "express";

import * as controller from "@/controllers/client/reservation";

const router = Router();

router.post("/new", controller.createReservation);
router.get("/user", controller.getReservationByUser);
router.get("/", controller.getReservations);
router.post("/", controller.saveReservation);

export default router;
