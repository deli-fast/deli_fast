import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./product.entity"

@Entity("types")
class Type {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column()
    name: string

    @OneToOne(() => Product, (product) => product.type)
    product: Product
}

export { Type }