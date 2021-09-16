import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

import User from "@/entities/User";
import Recovery from "@/entities/Recovery";

export async function sendCodeByEmail(email: string) {
  const user = await User.findByEmail(email);
  if (!user) return false;

  const code = await Recovery.generateNewRecovery(user.id);

  const msg = {
    to: email,
    from: process.env.SENDGRID_EMAIL,
    subject: "Drivent: Password Recovery",
    text: `Seu código de recuperação é: ${code}`,
    html: `<p>Seu código de recuperação é: ${code}</p>`,
  };

  await sgMail.send(msg);

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
