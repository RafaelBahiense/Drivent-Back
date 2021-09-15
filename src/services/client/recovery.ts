import User from "@/entities/User";

export async function createReservation() {}

export async function findUserByEmail(email: string) {
  const user = await User.findOne({ email });
  return user?.email;
}

export async function sendCodeByEmail(email: string) {
  //generate code and store { email, code }
  //send e-mail through SendGrid
}

export async function isValideCode(email: string, code: string) {
  //checa no storage se possui { email, code }
  //retorna true ou false
  return true;
}
