import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import Room from "./Room";

@Entity("hotels")
export default class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Room, (room) => room.hotel)
  rooms: Room[];

  availableBeds?: number = 0;
  roomsTypes?: string = "";

  countAvailableBeds(): void {
    this.rooms.forEach((room) => (this.availableBeds += room.availableBeds));
  }

  defineRoomsTypes(): void {
    const typesArray: string[] = [];
    for (let i = 1; i <= 3; i++) {
      this.rooms.forEach((r) => {
        if (r.capacity === i && i === 1 && !typesArray.includes("Single")) {
          typesArray.push("Single");
        } else if (
          r.capacity === i &&
          i === 2 &&
          !typesArray.includes("Double")
        ) {
          typesArray.push("Double");
        } else if (
          r.capacity === i &&
          i === 3 &&
          !typesArray.includes("Triple")
        ) {
          typesArray.push("Triple");
        }
      });
    }
    if (typesArray.length === 1) {
      this.roomsTypes = typesArray[0];
    } else if (typesArray.length === 2) {
      this.roomsTypes = `${typesArray[0]} e ${typesArray[1]}`;
    } else if (typesArray.length === 3) {
      this.roomsTypes = `${typesArray[0]}, ${typesArray[1]} e ${typesArray[2]}`;
    }
  }
}
