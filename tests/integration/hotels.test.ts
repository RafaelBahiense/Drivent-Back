import supertest from "supertest";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createHotel } from "../factories/hotelFactory";
import { createSession, createUser } from "../factories/userFactory";
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

describe("GET /hotels/", () => {
  it("should return list of all hotels", async () => {
    await createHotel();
    const user = await createUser();
    const token = await createSession(user);
    const response = await agent.get("/hotels/").set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          image: expect.any(String),
          availableBeds: expect.any(Number),
          rooms: expect.any(Array),
        }),
      ])
    );
  });
});
