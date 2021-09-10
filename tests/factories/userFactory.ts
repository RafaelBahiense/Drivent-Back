import faker from "faker";
import jwt from "jsonwebtoken";

import User from "@/entities/User";
import Session from "@/entities/Session";

export async function createUser() {
  const user = User.create({
    email: faker.internet.email(),
    password: "123456",
  });

  await user.save();

  return user;
}

export async function createSession(user: User) {
  const token = jwt.sign({
    userId: user.id
  }, process.env.JWT_SECRET);

  await Session.createNew(user.id, token);
  return token;
}
