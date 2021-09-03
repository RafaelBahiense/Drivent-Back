import Hotel from "@/entities/Hotel";

export async function createHotel() {
  const hotel = Hotel.create({
    name: "test",
    image: "test",
  });

  await hotel.save();
  
  return hotel;
}
