import {user} from '../dao/User';
import { Request as req, Response as res} from 'express';

class UserController{
    public addUser(req:req, res:res){
        try {
            console.log('request body',req.body)
        } catch (error) {
            console.log(`ERROR:`,error);
        }
    }
    public getUser(req:req, res:res){
        try {
            console.log('request.query',req.query);
            res.status(200).send({data:'datatatatatatat'});    
        } catch (error) {
          console.log(`ERROR:`,error)  
        }
    }
}

var userController : UserController = new UserController();
export{userController}