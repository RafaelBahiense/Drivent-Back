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
    const { user, session, ticket, payment } = await reservationRequirementsFactory();
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
        room: expect.objectContaining({ 
          availableBeds: expect.any(Number), 
          capacity: expect.any(Number), 
          hotel: null, 
          id: expect.any(Number), 
          number: expect.any(String)
        }),
        roomId: expect.any(Number),
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

  it("should return 403 when the avaibleBeds are sold out", async () => {
    const { user, session, ticket, payment } = await reservationRequirementsFactory();
    const room = await createRoom(1, 0);
    await createReservation(user.id, ticket.id, payment.id);

    const response = await agent.post("/reservation").send({
      roomId: room.id,
    }).set("Authorization", "Bearer " + session.token);

    expect(response.status).toEqual(403);
  });

  it("should return 403 when the user already has a reservation", async () => {
    const { user, session, ticket, payment } = await reservationRequirementsFactory();
    const room = await createRoom(1, 1);
    await createReservation(user.id, ticket.id, payment.id);

    await agent.post("/reservation").send({ roomId: room.id }).set("Authorization", "Bearer " + session.token);

    const response = await agent.post("/reservation").send({
      roomId: room.id,
    }).set("Authorization", "Bearer " + session.token);

    expect(response.status).toEqual(403);
  });

  it("must switch rooms if the user sends the optional argument of the room to be switched", async () => {
    const { user, session, ticket, payment } = await reservationRequirementsFactory();
    const room1 = await createRoom(1, 1);
    const room2 = await createRoom(1, 1);
    await createReservation(user.id, ticket.id, payment.id);

    await agent.post("/reservation").send({ roomId: room1.id }).set("Authorization", "Bearer " + session.token);

    const response = await agent.post("/reservation").send({
      roomId: room2.id, changeRoom: room1.id
    }).set("Authorization", "Bearer " + session.token);

    expect(response.status).toEqual(200);
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
        room: expect.objectContaining({ 
          availableBeds: expect.any(Number), 
          capacity: expect.any(Number), 
          hotel: null, 
          id: expect.any(Number), 
          number: expect.any(String)
        }),
        roomId: expect.any(Number),
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

  it("must switch rooms if the user sends the optional argument of the room to be switched", async () => {
    const { user, session, ticket, payment } = await reservationRequirementsFactory();
    const room1 = await createRoom(1, 1);
    const room2 = await createRoom(1, 1);
    await createReservation(user.id, ticket.id, payment.id);

    await agent.post("/reservation").send({ roomId: room1.id }).set("Authorization", "Bearer " + session.token);

    const response = await agent.post("/reservation").send({
      roomId: room2.id, changeRoom: room1.id
    }).set("Authorization", "Bearer " + session.token);

    const response2 = await agent.get("/reservation").set("Authorization", "Bearer " + session.token);

    expect(response.status).toEqual(200);
    expect(response2.body.room.id).toEqual(room2.id);
    expect(response2.body.room.availableBeds).toEqual(0);
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
        room: expect.objectContaining({ 
          availableBeds: expect.any(Number), 
          capacity: expect.any(Number), 
          hotel: null, 
          id: expect.any(Number), 
          number: expect.any(String)
        }),
        roomId: expect.any(Number),
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

async function reservationRequirementsFactory() {
  const user = await createUser();
  const session = await(createSession(user.id));
  const ticket = await createTicket();
  const payment = await createPayment();

  return { user, session, ticket, payment };
}

