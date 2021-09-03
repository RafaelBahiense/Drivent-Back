import { Router } from "express";

import * as controller from "@/controllers/client/reservation";

const router = Router();

router.post("/", controller.post);

export default router;
