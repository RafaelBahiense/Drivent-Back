import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Activity from "./Activity";
import User from "./User";

@Entity("user_activities")
export default class UserActivities extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  activityId: number;

  @ManyToOne(() => Activity)
  activity: Activity;

  @ManyToOne(() => User)
  user: User;
}
