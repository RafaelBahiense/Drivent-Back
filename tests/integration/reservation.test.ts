import supertest from "supertest";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { redisClient } from "../../src/app";
import { createUser } from "../factories/userFactory";
import { createSession } from "../factories/sessionFactory";

const agent = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await createBasicSettings();
});

afterAll(async () => {
  redisClient.quit();
  await clearDatabase();
  await endConnection();
});

describe("POST /reservation/new", () => {
  it("should return reservation data with ticket", async () => {
    const user = await createUser();
    const session = await createSession(user.id);
    const response = await agent
      .post("/reservation/new")
      .send({
        userId: user.id,
        isPresencial: true,
        hasHotel: true,
      })
      .set("Authorization", "Bearer " + session);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: expect.any(Number),
        ticketId: expect.any(Number),
        roomId: null,
        room: null,
        payment: null,
        paymentId: null,
        ticket: expect.any(Object),
      })
    );
  });
});
