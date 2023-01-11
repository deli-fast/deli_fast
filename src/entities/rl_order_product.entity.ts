import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./order.entity"
import { Product } from "./product.entity"

@Entity("rl_order_product")
class RlOrderProduct {
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(() => Order, (order) => order.rlOrderProduct)
    order: Order

    @ManyToOne(() => Product, (product) => product.rlOrderProduct)
    product: Product
}

export { RlOrderProduct }