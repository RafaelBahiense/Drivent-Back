import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import ticketRouter from "@/routers/client/ticket";
import hotelRouter from "@/routers/client/hotel";
import reservationRouter from "@/routers/client/reservation";
import activityRouter from "@/routers/client/activity";
import paymentRouter from "@/routers/client/payment";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/ticket", ticketRouter);
router.use("/hotels", tokenValidationMiddleware, hotelRouter);
router.use("/reservation", tokenValidationMiddleware, reservationRouter);
router.use("/activities", tokenValidationMiddleware, activityRouter);
router.use("/payments", tokenValidationMiddleware, paymentRouter);

export default router;
