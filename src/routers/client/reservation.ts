import { Router } from "express";

import * as controller from "@/controllers/client/reservation";

const router = Router();

router.post("/", controller.createReservation);
router.get("/", controller.getReservations);
router.post("/", controller.updateReservation); //mudar para /update ou para .update

export default router;
