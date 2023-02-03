/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import cors from 'cors'
import express, { Express } from 'express'
import fileUpload = require('express-fileupload')
import path = require('path')
import dotenv from 'dotenv'
dotenv.config()
// eslint-disable-next-line import/first
import { user } from './router/User'

class App {
  public app: Express
    constructor () {
      this.app = express()
      this.startServer()
      this.mountRouter()
    }

    private mountRouter (): void {
      this.app.use(fileUpload())
      .use('/crud', user.getRouter())
    }

    private startServer (): void {
        this.app.use(cors({
            origin: '*'
        }))
        this.app.use(express.json())
        .use(express.static(path.join(__dirname, '/upload')))
        .listen(process.env.PORT, () => {
            console.log(`%c server is started on port ${process.env.PORT}`, 'color:red')
        })
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let app = new App()
