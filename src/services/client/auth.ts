import jwt from "jsonwebtoken";

import UnauthorizedError from "@/errors/Unauthorized";
import User from "@/entities/User";
import { Session as SessionType } from "express-session";

export async function signIn(email: string, password: string, session: SessionType) {
  const user = await User.findByEmailAndPassword(email, password);

  if (!user) {
    throw new UnauthorizedError();
  }
  const token = jwt.sign({
    userId: user.id,
    sessionId: session.id
  }, process.env.JWT_SECRET);
  session.save();

  return {
    user: {
      id: user.id,
      email: user.email
    },

    token
  };
}
