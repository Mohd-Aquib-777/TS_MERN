import {BaseEntity, Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"

@Entity()
class User extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    firstName: string

    @Column()
    lastName: string

    // @Column((type) => Profile)
    // profile: Profile

    // @Column((type) => Photo)
    // photos: Photo[]
}


export{User}