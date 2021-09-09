import supertest from "supertest";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createHotel } from "../factories/hotelFactory";
import { createSession, createUser } from "../factories/userFactory";
import { createEventDay } from "../factories/eventDayFactory";

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

describe("GET /activities/", () => {
  it("should return list of event days containing its activities", async () => {
    await createEventDay();
    const user = await createUser();
    const token = await createSession(user);
    const response = await agent.get("/activities/").set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          date: expect.any(String),
          activities: expect.any(Array),
        }),
      ])
    );
  });
});
