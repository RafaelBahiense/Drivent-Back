import supertest from "supertest";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";

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

describe("POST /reservation/new", () => {
  it("should return reservation data with ticket", async () => {
    const response = await agent.post("/reservation/new");
    console.log(response.body);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: expect.any(Number),
        ticketId: expect.any(Number),
        roomId: null,
        room: null,
        payment: null,
      })
    );
  });
});
