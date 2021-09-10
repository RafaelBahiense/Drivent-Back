import { Router } from "express";

import * as controller from "@/controllers/client/reservation";

const router = Router();

router.post("/new", controller.createReservation);
router.get("/", controller.getReservation);
router.post("/room", controller.insertRoomReservation);


export default router;
