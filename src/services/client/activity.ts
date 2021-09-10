import Activity from "@/entities/Activity";
import EventDay from "@/entities/EventDay";
import User from "@/entities/User";
import UserActivities from "@/entities/UserActivities";

export async function getActivitiesDaysList() {
  const activitiesDaysList = await EventDay.createQueryBuilder("event_day")
    .leftJoinAndSelect("event_day.activities", "activity")
    .leftJoinAndSelect("activity.activityPlace", "place")
    .leftJoinAndSelect("activity.users", "user")
    .orderBy("activity.id", "ASC")
    .getMany();

  return activitiesDaysList;
}

export async function saveActivityUserReservation(
  userId: number,
  activityId: number
) {
  const user = await User.findOne({ where: { id: userId } });
  const activity = await Activity.findOne({ where: { id: activityId } });
  if (activity.totalSeats - activity.users.length < 1) {
    return null;
  }
  const UserActivity = UserActivities.create();
  UserActivity.user = user;
  UserActivity.activity = activity;
  await UserActivity.save();
  return UserActivity;
}
