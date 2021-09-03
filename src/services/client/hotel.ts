import Hotel from "@/entities/Hotel";

export async function getHotelInfo() {
  const hotelInfo = await Hotel.createQueryBuilder("hotels")
    .leftJoinAndSelect("hotels.rooms", "room")
    .orderBy("room.id", "ASC")
    .getMany();

  hotelInfo.forEach((h) => {
    h.countAvailableBeds();
    h.defineRoomsTypes();
  });
  return hotelInfo;
}
