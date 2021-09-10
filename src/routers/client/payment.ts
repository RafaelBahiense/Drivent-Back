import { Router } from "express";

import * as controller from "@/controllers/client/payments";

const router = Router();

router.post("/", controller.savePayment);

export default router;
