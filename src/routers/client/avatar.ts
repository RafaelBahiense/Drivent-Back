import { Router } from "express";

import * as controller from "@/controllers/client/avatar";

const router = Router();

router.post("/", controller.postProfilePicture);
export default router;
