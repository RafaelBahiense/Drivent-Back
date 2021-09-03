import Hotel from "@/entities/Hotel";

export async function getHotelInfo() {
  const hotelInfo = await Hotel.find();
  hotelInfo.forEach((h) => h.countAvailableBeds());
  return hotelInfo;
}
