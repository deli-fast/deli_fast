import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { hashSync } from "bcryptjs";
import { Address } from "./address.entity";
import { Order } from "./order.entity";

export enum EnumUser {
  ADMIN = "admin",
  DELIVERYMAN = "deliveryman",
  NORMAL = "normal",
}

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column({ unique: true })
  cpf: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  telephone: string;
  @Column({
    type: "enum",
    enum: EnumUser,
    default: EnumUser.NORMAL,
  })
  type: EnumUser;
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @OneToMany(() => Address, (address) => address.user)
  address: Address[];

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];
}

export { User };
