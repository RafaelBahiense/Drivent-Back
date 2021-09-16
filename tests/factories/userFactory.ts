import faker from "faker";
import jwt from "jsonwebtoken";

import User from "@/entities/User";
import { redisClient } from "../../src/app";

export async function createUser() {
  const user = User.create({
    email: faker.internet.email(),
    password: "123456",
  });

  await user.save();

  return user;
}

export async function createSession(user: User) {
  await redisClient.set("sess:test", "test");
  await redisClient.expire("sess:test", 30);

  const token = jwt.sign(
    {
      userId: user.id,
      sessionId: "test",
    },
    process.env.JWT_SECRET
  );

  return token;
}
