import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"


@Entity("address")
class Address {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column()
    district: string
    @Column()
    zipCode: string
    @Column({nullable: true})
    number: string
    @Column()
    city: string
    @Column()
    state: string

    @ManyToOne(() => User, (user) => user.address)
    user: User
}

export { Address }