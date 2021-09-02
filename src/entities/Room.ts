import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import Hotel from "./Hotel";

@Entity("rooms")
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  capacity: number;

  @Column()
  availableBeds: number;

  @ManyToOne(() => Hotel)
  hotel: Hotel;
}
