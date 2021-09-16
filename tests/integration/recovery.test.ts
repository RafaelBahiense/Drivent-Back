import supertest from "supertest";

import app, { init } from "../../src/app";
import {
  clearDatabase,
  clearRecoveryTest,
  endConnection,
} from "../utils/database";
import { createBasicSettings } from "../utils/app";

import { createUser } from "../factories/userFactory";
import Recovery from "@/entities/Recovery";
import User from "@/entities/User";

jest.mock("@sendgrid/mail", () => {
  return {
    setApiKey: () => {},
    send: () => {},
  };
});

const agent = supertest(app);

beforeAll(async () => {
  await init();
  await clearDatabase();
  await createBasicSettings();
}, 10000);

beforeEach(async () => {
  await clearRecoveryTest();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
}, 10000);

describe("POST /recovery", () => {
  it("should return status 200 for valid e-mail", async () => {
    const user = await createUser();

    const response = await agent.post("/recovery").send({ email: user.email });

    expect(response.status).toEqual(200);
  });

  it("should return status 404 for invalid e-mail", async () => {
    const response = await agent
      .post("/recovery")
      .send({ email: "teste@teste.com" });

    expect(response.status).toEqual(404);
  });
});

describe("POST /recovery/verify", () => {
  it("should return status 200 for valid email and code", async () => {
    const user = await createUser();
    const code = await Recovery.generateNewRecovery(user.id);

    const response = await agent
      .post("/recovery/verify")
      .send({ email: user.email, code });

    expect(response.status).toEqual(200);
  });

  it("should return status 406 for invalid code", async () => {
    const user = await createUser();
    const code = await Recovery.generateNewRecovery(user.id);

    const response = await agent
      .post("/recovery/verify")
      .send({ email: user.email, code: "123456" });

    expect(response.status).toEqual(406);
  });
});

describe("POST /recovery/new", () => {
  it("should return status 200 for valid email, code and password", async () => {
    const user = await createUser();
    const code = await Recovery.generateNewRecovery(user.id);

    const response = await agent
      .post("/recovery/new")
      .send({ email: user.email, code, password: "654321" });

    expect(response.status).toEqual(200);
  });

  it("should change user password for valid email, code and password", async () => {
    const user = await createUser();
    const code = await Recovery.generateNewRecovery(user.id);

    const response = await agent
      .post("/recovery/new")
      .send({ email: user.email, code, password: "654321asd" });

    const updatedUser = await User.findOne({ id: user.id });

    expect(updatedUser.password !== user.password).toEqual(true);
  });

  it("should return status 400 for invalid code", async () => {
    const user = await createUser();
    const code = await Recovery.generateNewRecovery(user.id);

    const response = await agent
      .post("/recovery/new")
      .send({ email: user.email, code: "123456" });

    expect(response.status).toEqual(400);
  });
});
