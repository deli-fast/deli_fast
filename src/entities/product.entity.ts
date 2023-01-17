import { Column, Entity,OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { RlOrderProduct } from "./rl_order_product.entity"
import { Type } from "./type.entity"

@Entity("products")
class Product {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    stock: number

    @ManyToOne(() => Type, (type) => type.products)
    type: Type

    @OneToMany(() => RlOrderProduct, (rlOrderProduct) => rlOrderProduct.product)
    rlOrderProduct: RlOrderProduct
}

export { Product }