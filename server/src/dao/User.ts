// import { getMongoManager } from 'typeorm'
import { db } from '../model/DatabaseConnection'
import { User as userModel } from '../model/User.entity'
class User {
    private readonly userRepo = db.getMongoRepository(userModel)
    public async saveUser (obj: object): Promise<string> {
        return this.userRepo.save(obj)
    }

    public async getUserData (): Promise<object> {
        return this.userRepo.find({})
    }

    public async updateData (id: string, data: object): Promise<object> {
        return this.userRepo.update(id, data)
    }

    public async deleteData (id: string): Promise<object> {
        return this.userRepo.delete(id)
    }
}

const user: User = new User()

export { user }
