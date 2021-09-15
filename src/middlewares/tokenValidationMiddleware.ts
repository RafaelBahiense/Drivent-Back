import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import * as sessionService from "@/services/client/session";
import UnauthorizedError from "@/errors/Unauthorized";
import { redisClient } from "@/app";

interface JwtPayload {
  userId: number;
  sessionId: string;
}

export default async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.header("Authorization");

    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      throw new UnauthorizedError();
    }

    const { userId, sessionId } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    
    const sessionKey = `sess:${sessionId}`;
    redisClient.get(sessionKey, (err, data) => {
      if(!data) {
        throw new UnauthorizedError();
      }
    });

    req.user = { id: userId };
    next();
  } catch (e) {
    throw new UnauthorizedError();
  }
}
