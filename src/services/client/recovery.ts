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
  const user = await userByValidCode(email, code); //to test: asd@asd.com / 54b4b50e-1838-4766-b75f-74ae017a7772 19:25
  if (user) {
    await User.setNewPassword(user.id, password);
    await Recovery.delete({ userId: user.id });
    return true;
  }
  return false;
}

//SELECT * FROM recoveries; -> ver que ta lá
//post /recovery/verify -> retorna erro e deleta por ter passado mais de 15 min
//SELECT * FROM recoveries; -> ver que deletou
