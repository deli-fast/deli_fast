import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./product.entity"

@Entity("types")
class Type {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column()
    name: string

    @OneToMany(() => Product, (product) => product.type)
    products: Product[]
}

export { Type }