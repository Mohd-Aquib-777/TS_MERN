/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import cors from 'cors'
import express, { Express } from 'express'

import dotenv from 'dotenv'
dotenv.config()
import { user } from './router/User'

// import { db } from './model/DatabaseConnection'

class App {
  public app: Express
    constructor () {
      this.app = express()
      this.startServer()
      this.mountRouter()
    }

    private mountRouter (): void {
     this.app.use('/crud', user.getRouter())
    }

    private startServer (): void {
        this.app.use(cors({
            origin: '*'
        }))
        this.app.use(express.json())
        // this.app.use(bodyParser.urlencoded({ extended: false }))
        // this.app.use(bodyParser.json())
        this.app.listen(process.env.PORT, () => {
            console.log(`%c server is started on port ${process.env.PORT}`, 'color:red')
        })
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let app = new App()
