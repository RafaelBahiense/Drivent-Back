import UserActivities from "../../src/entities/UserActivities";

export async function createSeatReservation(userId: number, activityId: number) {
  const userActivity = UserActivities.create();

  userActivity.userId = userId;
  userActivity.activityId = activityId;

  await userActivity.save();

  return userActivity;
}
