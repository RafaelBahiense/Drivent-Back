import EventDay from "@/entities/EventDay";

export async function getActivitiesDaysList() {
  const activitiesDaysList = await EventDay.find();

  return activitiesDaysList;
}
