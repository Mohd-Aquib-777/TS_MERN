import {db} from '../model/DatabaseConnection';
import { User as userModel } from "../model/User";
class User{

    public async saveUser(obj:object){
        return await db.getRepository(userModel).save(obj)
    }

}

var user: User = new User();

export{user}