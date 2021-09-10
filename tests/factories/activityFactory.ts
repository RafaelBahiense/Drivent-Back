
import Activity from "../../src/entities/Activity";

export async function createActivity(
  placeId?: number,
  dayId?: number,
  seats?: number
) {
  const activity = Activity.create();

  activity.name = "test";
  activity.duration = 60;
  activity.time = new Date();
  activity.eventDayId = dayId;
  activity.activityPlaceId = placeId;
  activity.totalSeats = seats;

  await activity.save();

  return activity;
}
