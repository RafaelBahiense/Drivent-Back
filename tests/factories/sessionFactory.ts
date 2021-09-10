import Session from "@/entities/Session";
import jwt from "jsonwebtoken";

export async function createSession(userId: number) {
  const token = jwt.sign({
    userId
  }, process.env.JWT_SECRET);

  const session = Session.create({
    userId,
    token,
  });

  await session.save();

  return session;
}
