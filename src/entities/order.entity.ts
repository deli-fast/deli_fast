import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, DeleteDateColumn } from "typeorm"
import { EnumOrder } from "../interfaces/order"
import { RlOrderProduct } from "./rl_order_product.entity"
import { User } from "./user.entity"

@Entity("orders")
class Order {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    date: Date
    @Column( { type: "decimal", precision: 12, scale:2 })
    value: number
    @Column({default : "EM ANDAMENTO"})
    status: string

    @DeleteDateColumn()
    deleteAt: Date

    @ManyToOne(() => User, (user) => user.order)
    user: User

    @OneToMany(() => RlOrderProduct, (rlOrderProduct) => rlOrderProduct.order)
    rlOrderProduct: RlOrderProduct

}

export { Order }