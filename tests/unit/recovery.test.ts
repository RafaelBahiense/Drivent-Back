import * as recoveryService from "@/services/client/recovery";
import User from "@/entities/User";
import Recovery from "@/entities/Recovery";

jest.mock("typeorm", () => {
  return {
    BaseEntity: class MockedBaseEntity {},
    Entity: () => {},
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    OneToOne: () => {},
    OneToMany: () => {},
    ManyToOne: () => {},
    JoinColumn: () => {},
  };
});

jest.mock("@sendgrid/mail", () => {
  return {
    setApiKey: () => {},
    send: () => {},
  };
});

describe("sendCodeByEmail", () => {
  it("should return false for invalid user", async () => {
    jest.spyOn(User, "findByEmail").mockResolvedValueOnce(undefined);

    const result = await recoveryService.sendCodeByEmail("email");

    await expect(result).toEqual(false);
  });

  it("should return true for valid user", async () => {
    jest.spyOn(User, "findByEmail").mockResolvedValueOnce({} as User);
    jest.spyOn(Recovery, "generateNewRecovery").mockResolvedValueOnce("code");

    const result = await recoveryService.sendCodeByEmail("email");

    await expect(result).toEqual(true);
  });
});

describe("userByValidCode", () => {
  it("should return false when there is no user with that e-mail", async () => {
    jest.spyOn(User, "findByEmail").mockResolvedValueOnce(undefined);
    jest.spyOn(Recovery, "validateCode").mockResolvedValueOnce(false);

    const result = await recoveryService.userByValidCode("email", "code");

    await expect(result).toEqual(false);
  });

  it("should return false when the code doesn't match", async () => {
    jest.spyOn(User, "findByEmail").mockResolvedValueOnce({} as User);
    jest.spyOn(Recovery, "validateCode").mockResolvedValueOnce(false);

    const result = await recoveryService.userByValidCode("email", "code");

    await expect(result).toEqual(false);
  });
});

describe("setNewPassword", () => {
  it("should return false when there is no user with that e-mail/code", async () => {
    jest.spyOn(User, "findByEmail").mockResolvedValueOnce(undefined);
    jest.spyOn(Recovery, "validateCode").mockResolvedValueOnce(false);

    const result = await recoveryService.setNewPassword(
      "email",
      "code",
      "password"
    );

    await expect(result).toEqual(false);
  });
});
