import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import Activity from "./Activity";

@Entity("eventDay")
export default class EventDay extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  date: Date;

  @OneToMany(() => Activity, (activity) => activity.eventDay, { eager: true })
  activities: Activity[];
}
