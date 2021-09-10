import ActivityPlace from "../../src/entities/ActivityPlace";

export async function createActivityPlace() {
  const activityPlace = ActivityPlace.create();

  activityPlace.name = "test";

  await activityPlace.save();
  return activityPlace;
}
