import Hotel from "@/entities/Hotel";

export async function getHotelInfo() {
  const hotelInfo = await Hotel.find();
  hotelInfo.forEach((h) => {
    h.countAvailableBeds();
    h.defineRoomsTypes();
  });
  return hotelInfo;
}
