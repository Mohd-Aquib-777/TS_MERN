import express,{Express} from 'express';
import dotenv from 'dotenv';
import {user} from './router/User'
import {db} from './model/DatabaseConnection'
dotenv.config();
class App{
    public app : Express;
    private port: any;
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.startServer();
        this.mountRouter();
    }

    private mountRouter(){
        this.app.use('/user',user.getRouter());
    }

    private startServer(){
        this.app.listen(this.port,()=>{
            console.log(`%c server is started on port ${this.port}`,'color:red');
        });
    }
}

var app = new App();