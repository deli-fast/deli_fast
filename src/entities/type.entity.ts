import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity("types")
class Type {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column()
    name: string
}

export { Type }