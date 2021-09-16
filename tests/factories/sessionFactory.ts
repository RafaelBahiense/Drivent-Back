import jwt from "jsonwebtoken";

import { redisClient } from "../../src/app";

export async function createSession(userId: number) {
  await redisClient.set("sess:test", "test");
  await redisClient.expire("sess:test", 30);
  const token = jwt.sign(
    {
      userId: userId,
      sessionId: "test",
    },
    process.env.JWT_SECRET
  );

  return token;
}
