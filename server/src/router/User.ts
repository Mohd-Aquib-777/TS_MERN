import {Request as req,Response as res,Router} from "express";
import {userController} from '../controller/UserController';
class User{
    public router : Router;
    constructor(){
        this.router = Router();
        this.mountRouter();
    }

    private mountRouter(){
        this.router.get('/',userController.getUser);
        this.router.post('/',userController.addUser);
        this.router.delete('/',(req:req,res:res)=>{console.log('delete request')});
        this.router.patch('/',(req:req,res:res)=>{console.log('update request')});
    }

    public getRouter(){
        return this.router;
    }

}

var user: User = new User();
export{user}