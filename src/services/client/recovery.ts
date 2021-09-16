import User from "@/entities/User";
import Recovery from "@/entities/Recovery";

export async function sendCodeByEmail(email: string) {
  const user = await User.findByEmail(email);
  if (!user) return false;

  const code = await Recovery.generateNewRecovery(user.id);
  //send e-mail with code through SendGrid
  console.log(code);

  return true;
}

export async function userByValidCode(email: string, code: string) {
  const user = await User.findByEmail(email);
  if (!user) return false;

  const validated = await Recovery.validateCode(user.id, code);

  if (validated) {
    return user;
  }
  return false;
}

export async function setNewPassword(
  email: string,
  code: string,
  password: string
) {
  const user = await userByValidCode(email, code);
  if (user) {
    await User.setNewPassword(user.id, password);
    await Recovery.delete({ userId: user.id });
    return true;
  }
  return false;
}
