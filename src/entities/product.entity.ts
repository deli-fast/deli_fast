import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
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

    @OneToOne(() => Type, (type) => type)
    @JoinColumn()
    type: Type

    @OneToMany(() => RlOrderProduct, (rlOrderProduct) => rlOrderProduct.product)
    rlOrderProduct: RlOrderProduct
}

export { Product }