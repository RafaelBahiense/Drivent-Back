import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("ticket_prices")
export default class TicketPrice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  static async getPrices() {
    return await TicketPrice.find();
  }
}
