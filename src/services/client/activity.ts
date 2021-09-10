import Activity from "@/entities/Activity";
import EventDay from "@/entities/EventDay";
import User from "@/entities/User";
import UserActivities from "@/entities/UserActivities";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

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
  if (await checkActivityTimeConflict(activity, userId)) return true;
  const UserActivity = UserActivities.create();
  UserActivity.user = user;
  UserActivity.activity = activity;
  await UserActivity.save();
  return UserActivity;
}

async function checkActivityTimeConflict(activity: Activity, userId: number) {
  const reservatedSeatsByUserId = await UserActivities.find({
    where: { userId: userId },
    relations: ["activity"],
  });
  const isReservedAtTheSameTime = reservatedSeatsByUserId.find((reserved) => {
    if (reserved.activity.eventDayId === activity.eventDayId) {
      if (
        dayjs(`1999-10-10 ${activity.time}`)
          .add(1, "minute")
          .isBetween(
            `1999-10-10 ${reserved.activity.time}`,
            dayjs(`1999-10-10 ${reserved.activity.time}`).add(
              reserved.activity.duration,
              "minute"
            )
          ) ||
        dayjs(`1999-10-10 ${activity.time}`)
          .add(activity.duration - 1, "minute")
          .isBetween(
            `1999-10-10 ${reserved.activity.time}`,
            dayjs(`1999-10-10 ${reserved.activity.time}`).add(
              reserved.activity.duration,
              "minute"
            )
          )
      ) {
        return true;
      }
    }
  });
  if (isReservedAtTheSameTime) return true;
}
