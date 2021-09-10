import supertest from "supertest";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createSession, createUser } from "../factories/userFactory";
import { createEventDay } from "../factories/eventDayFactory";
import { createActivity } from "../factories/activityFactory";
import { createActivityPlace } from "../factories/activityPlaceFactory";
import { createSeatReservation } from "../factories/userActivityFactory";

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

  it("should return 401 if not authenticated user", async () => {
    await createEventDay();
    const response = await agent.get("/activities/").set({
      Authorization: "Bearer Token",
    });

    expect(response.status).toEqual(401);
  });
});

describe("POST /activities/", () => {
  it("should return reservation object if reservation is valid", async () => {
    const user = await createUser();
    const token = await createSession(user);
    const eventDay = await createEventDay();
    const activityPlace = await createActivityPlace();
    const activity = await createActivity(activityPlace.id, eventDay.id, 1);
    const response = await agent
      .post("/activities/")
      .send({ activityId: activity.id })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: expect.any(Number),
        activityId: expect.any(Number),
      })
    );
  });

  it("should return 401 if not authenticated user", async () => {
    const response = await agent
      .post("/activities/")
      .send({ activityId: 1 })
      .set({
        Authorization: "Bearer token",
      });

    expect(response.status).toEqual(401);
  });

  it("should return 403 if there is no available seat at activity", async () => {
    const user = await createUser();
    const token = await createSession(user);
    const eventDay = await createEventDay();
    const activityPlace = await createActivityPlace();
    const activity = await createActivity(activityPlace.id, eventDay.id, 0);
    const response = await agent
      .post("/activities/")
      .send({ activityId: activity.id })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toEqual(403);
  });

  it("should return 409 if trying to reservate seat at activity ocurring at the same time of another reservated activity", async () => {
    const user = await createUser();
    const token = await createSession(user);
    const eventDay = await createEventDay();
    const activityPlace = await createActivityPlace();
    const activity1 = await createActivity(activityPlace.id, eventDay.id, 1);
    const activity2 = await createActivity(activityPlace.id, eventDay.id, 1);
    await createSeatReservation(user.id, activity1.id);
    const response = await agent
      .post("/activities/")
      .send({ activityId: activity2.id })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toEqual(409);
  });
});

describe("POST /activities/delete", () => {
  it("should return status code 200 when reservated seat is deleted", async () => {
    const user = await createUser();
    const token = await createSession(user);
    const eventDay = await createEventDay();
    const activityPlace = await createActivityPlace();
    const activity = await createActivity(activityPlace.id, eventDay.id, 1);
    await createSeatReservation(user.id, activity.id);
    const response = await agent
      .post("/activities/delete")
      .send({ activityId: activity.id })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toEqual(200);
  });

  it("should return 401 if not authenticated user", async () => {
    const response = await agent
      .post("/activities/delete")
      .send({ activityId: 1 })
      .set({
        Authorization: "Bearer token",
      });

    expect(response.status).toEqual(401);
  });
});
