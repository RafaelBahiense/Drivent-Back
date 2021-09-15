import Enrollment from "@/entities/Enrollment";
export async function postProfilePicture(userId: number, url: string) {
  const enrollment = await Enrollment.findOne({ where: { userId: userId } });
  enrollment.url = url;
  await enrollment.save();
  return true;
}
