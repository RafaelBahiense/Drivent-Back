import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import EventDay from "./EventDay";
import ActivityPlace from "./ActivityPlace";

@Entity("activities")
export default class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "time" })
  time: Date;

  @Column()
  duration: number;

  @Column()
  eventDayId: number;

  @Column()
  activityPlaceId: number;

  @Column()
  totalSeats: number;

  @ManyToOne(() => EventDay)
  eventDay: EventDay;

  @ManyToOne(() => ActivityPlace)
  activityPlace: ActivityPlace;
}
