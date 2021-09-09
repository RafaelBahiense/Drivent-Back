import EventDay from "@/entities/EventDay";

export async function createEventDay() {
  const eventDay = EventDay.create({
    date: "now()",
  });

  await eventDay.save();
  
  return eventDay;
}
