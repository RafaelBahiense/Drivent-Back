import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import EventDay from "./EventDay";
import ActivityPlace from "./ActivityPlace";
import UserActivities from "./UserActivities";

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

  @ManyToOne(() => ActivityPlace, { eager: true })
  activityPlace: ActivityPlace;

  @OneToMany(() => UserActivities, (userActivity) => userActivity.activity, {
    eager: true,
  })
  users: UserActivities[];
}
