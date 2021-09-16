import Enrollment from "@/entities/Enrollment";
import User from "../../src/entities/User";

export async function createEnrollment(user: User) {
  const enrollment = Enrollment.create({
    name: "test",
    cpf: "12345678999",
    birthday: "11092000",
    phone: "21971717171",
    userId: user.id,
    url: null,
  });
  await enrollment.save();

  return enrollment;
}
