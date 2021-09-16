/* eslint-disable @typescript-eslint/no-empty-function */
import * as auth from "@/services/client/auth";
import User from "@/entities/User";
import { Session } from "express-session";
import jwt from "jsonwebtoken";
import UnauthorizedError from "@/errors/Unauthorized";

jest.mock("typeorm", () => {
  return {
    BaseEntity: class MockedBaseEntity {},
    Entity: () => {},
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    OneToMany: () => {},
    OneToOne: () => {},
    JoinColumn: () => {},
    ManyToOne: () => {},
  };
});

describe("signIn", () => {
  it("should return an object if found valid user by email and password", async () => {
    jest
      .spyOn(User, "findByEmailAndPassword")
      .mockResolvedValueOnce({} as User);
    jest.spyOn(jwt, "sign").mockImplementationOnce(() => "mocked");
    const result = await auth.signIn("mock", "mock", {
      id: "mock",
      save: () => {},
    } as Session);
    expect(result).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          email: undefined,
          id: undefined,
        }),
      })
    );
  });

  it("should throw unauthorized error if user not found", async () => {
    jest.spyOn(User, "findByEmailAndPassword").mockResolvedValueOnce(null);
    
    await expect(
      auth.signIn("mock", "mock", {
        id: "mock",
        save: () => {},
      } as Session)
    ).rejects.toThrowError(UnauthorizedError);
  });
});
