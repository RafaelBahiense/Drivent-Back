import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

@Entity("recoveries")
export default class Recovery extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  code: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  static hashCode(code: string) {
    return bcrypt.hashSync(code, 10);
  }

  static compareCode(code: string, hashedCode: string) {
    return bcrypt.compareSync(code, hashedCode);
  }

  static async generateNewRecovery(userId: number) {
    await this.delete({ userId });
    const code = uuid();
    const hashedCode = this.hashCode(code);
    const newRecovery = this.create({ userId, code: hashedCode });
    await newRecovery.save();
    return code;
  }

  static async validateCode(userId: number, code: string) {
    const recovery = await this.findOne({ userId });
    const recoveryDate = new Date(recovery.createdAt);
    const validThru = recoveryDate.getTime() + 1000 * 60 * 15;
    if (validThru < Date.now()) {
      await this.delete({ userId });
      return false;
    }
    const hashedCode = recovery.code;
    return this.compareCode(code, hashedCode);
  }
}
