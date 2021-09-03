import supertest from "supertest";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createHotel } from "../factories/hotelFactory";

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

describe("GET /hotels/", () => {
  it("should return list of all hotels", async () => {
    await createHotel();
    const response = await agent.get("/hotels/");

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
