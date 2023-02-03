import { BaseEntity, Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
// import reflect-metadata from ""
@Entity()
class User extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    city: number

    @Column()
    gender: string

    @Column()
    skills: object

    @Column()
    profilePic: string

    @Column()
    detail: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    public updated_at: Date
}

export { User }
