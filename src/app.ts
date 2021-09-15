import "@/setup";

import express from "express";
import "express-async-errors";
import session from "express-session";
import cors from "cors";
import "reflect-metadata";
import redis from "redis";
import connectRedis from "connect-redis";

import connectDatabase from "@/database";
import errorHandlingMiddleware from "@/middlewares/errorHandlingMiddleware";
import router from "@/routers";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.send("OK!");
});
const RedisStore = connectRedis(session);
export const redisClient = redis.createClient({
  host: "localhost",
  port: 6379
});

redisClient.on("error", function(err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function(err) {
  console.log("Connected to redis successfully");
});

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: "secret$%^134",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    httpOnly: false, 
    maxAge: 1000 * 60 * 10 
  }
}));

app.use(router);
app.use(errorHandlingMiddleware);

export async function init() {
  await connectDatabase();
}

export default app;
