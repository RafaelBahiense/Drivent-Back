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

  @OneToMany(() => Room, (room) => room.hotel, { eager: true })
  rooms: Room[];

  availableBeds?: number = 0;

  countAvailableBeds(): void {
    this.rooms.forEach((room) => (this.availableBeds += room.availableBeds));
  }
}
