import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
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
}

export { Product }