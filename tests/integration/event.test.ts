import supertest from "supertest";

import app, { init } from "../../src/app";
import Setting from "../../src/entities/Setting";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
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

describe("GET /event", () => {
  it("should return event settings", async () => {
    const response = await agent.get("/event");
    expect(response.body).toEqual({
      startDate: await getSettingValue("start_date"),
      endDate: await getSettingValue("end_date"),
      eventTitle: await getSettingValue("event_title"),
      backgroundImage: await getSettingValue("background_image"),
      logoImage: await getSettingValue("logo_image"),
    });
  });
});

async function getSettingValue(name: string) {
  const setting = await Setting.findOne({ name });
  return setting?.value;
}
