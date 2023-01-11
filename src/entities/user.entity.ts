import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm"
import { hashSync } from "bcryptjs"
import { EnumUser } from "../interfaces/users"


@ Entity("users")
class User {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column()
    name: string
    @Column({unique: true})
    cpf: string
    @Column({unique: true})
    email: string
    @Column()
    password: string
    @Column()
    telephone: number
    @Column({
        type: "enum",
        enum: EnumUser,
        default: EnumUser.NORMAL
    })
    type: EnumUser
    @Column({default: true})
    isActive: boolean
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword(){
        this.password = hashSync(this.password, 10)
    }

}

export { User }