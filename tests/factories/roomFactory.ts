import Room from "@/entities/Room";

export async function createRoom(capacity = 1, availableBeds = 1) {
  const room = Room.create({
    number: "101", 
    capacity,
    availableBeds
  });

  await room.save();
  
  return room;
}
