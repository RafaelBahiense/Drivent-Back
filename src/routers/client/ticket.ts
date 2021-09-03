import { Router } from "express";

import * as controller from "@/controllers/client/ticket";

const router = Router();

router.get("/prices", controller.get);

export default router;
