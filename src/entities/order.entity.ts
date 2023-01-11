import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { EnumOrder } from "../interfaces/order"
import { User } from "./user.entity"

@Entity("orders")
class Order {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    date: Date
    @Column( { type: "decimal", precision: 12, scale:2 })
    value: number
    @Column({
        type: "enum",
        enum: EnumOrder,
        default: EnumOrder.EMANDAMENTO
    })
    status: EnumOrder

    @ManyToOne(() => User, (user) => user.order)
    user: User

}

export { Order }