import supertest from "supertest";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { redisClient } from "../../src/app";
import { createSession, createUser } from "../factories/userFactory";
import { createEnrollment } from "../factories/enrollmentFactory";

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

describe("POST /avatar/", () => {
  it("should return 406 if the url string isn't on base64", async () => {
    const user = await createUser();
    const token = await createSession(user);
    const enrollment = await createEnrollment(user);
    const response = await agent
      .post("/avatar/")
      .send({ pictureUrl: "SomeStringObviouslyNotBase64Encoded..." })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.status).toEqual(406);
  });

  it("should return 200 if the url string is encoded on base64 by react-upload-images library", async () => {
    const user = await createUser();
    const token = await createSession(user);
    const enrollment = await createEnrollment(user);
    const response = await agent
      .post("/avatar/")
      .send({ pictureUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA" })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.status).toEqual(200);
  });
});
