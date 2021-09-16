import { Router } from "express";

import * as controller from "@/controllers/client/recovery";

const router = Router();

router.post("/", controller.sendCode);
router.post("/verify", controller.verifyCode);
router.post("/new", controller.setPassword);

export default router;
