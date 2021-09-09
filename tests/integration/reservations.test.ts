import supertest from "supertest";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createReservation } from "../factories/reservationFactory";
import { createTicket } from "../factories/ticketFactory";
import { createUser } from "../factories/userFactory";
import { createPayment } from "../factories/paymentFactory";
import { createSession } from "../factories/sessionFactory";
import { createRoom } from "../factories/roomFactory";

const agent = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await createBasicSettings();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("GET /reservations", () => {
  it("should return the information of the reservations of the user", async () => {
    const user = await createUser();
    const session = await(createSession(user.id));
    const ticket = await createTicket();
    const payment = await createPayment();
    await createReservation(user.id, ticket.id, payment.id);
    const response = await agent.get("/reservation").set("Authorization", "Bearer " + session.token);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        payment: expect.objectContaining({ 
          date: expect.any(String), 
          id: expect.any(Number), 
          reservationId: expect.any(Number), 
          value: expect.any(Number) 
        }),
        paymentId: expect.any(Number),
        room: null,
        roomId: null,
        ticket: expect.objectContaining({ 
          hasHotel: expect.any(Boolean), 
          id: expect.any(Number), 
          isPresencial: expect.any(Boolean), 
          reservationId: expect.any(Number) 
        }),
        userId: expect.any(Number),
        ticketId: expect.any(Number),
        user: expect.objectContaining({ 
          createdAt: expect.any(String), 
          email: expect.any(String), 
          id: expect.any(Number), 
          password: expect.any(String) 
        }),
      }),
    );
  });
});

describe("POST /reservations", () => {
  it("should return the information of the reservations of the user when sucessed to book the room", async () => {
    const user = await createUser();
    const session = await(createSession(user.id));
    const ticket = await createTicket();
    const payment = await createPayment();
    const room = await createRoom(1, 1);
    await createReservation(user.id, ticket.id, payment.id);
    const response = await agent.post("/reservation").send({
      roomId: room.id,
    }).set("Authorization", "Bearer " + session.token);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        payment: expect.objectContaining({ 
          date: expect.any(String), 
          id: expect.any(Number), 
          reservationId: expect.any(Number), 
          value: expect.any(Number) 
        }),
        paymentId: expect.any(Number),
        room: null,
        roomId: null,
        ticket: expect.objectContaining({ 
          hasHotel: expect.any(Boolean), 
          id: expect.any(Number), 
          isPresencial: expect.any(Boolean), 
          reservationId: expect.any(Number) 
        }),
        userId: expect.any(Number),
        ticketId: expect.any(Number),
        user: expect.objectContaining({ 
          createdAt: expect.any(String), 
          email: expect.any(String), 
          id: expect.any(Number), 
          password: expect.any(String) 
        }),
      }),
    );
  });
});
