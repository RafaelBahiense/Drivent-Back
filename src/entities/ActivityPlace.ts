import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("activity_places")
export default class ActivityPlace extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
