import supertest from "supertest";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";
import { createSession } from "../factories/sessionFactory";
import { createTicket } from "../factories/ticketFactory";
import { createReservation } from "../factories/reservationFactory";
import { redisClient } from "../../src/app";

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

describe("POST /reservations", () => {
  it("should return the information of the payment of the user when sucessed to book the room", async () => {
    const user = await createUser();
    const session = await createSession(user.id);
    const ticket = await createTicket();
    const reservation = await createReservation(user.id, ticket.id);

    const response = await agent
      .post("/payments")
      .send({
        value: 2000,
        reservationId: reservation.id,
      })
      .set("Authorization", "Bearer " + session);

    expect(response.body).toEqual(
      expect.objectContaining({
        date: expect.any(String),
        id: expect.any(Number),
        reservationId: expect.any(Number),
        value: expect.any(Number),
      })
    );
  });
});
