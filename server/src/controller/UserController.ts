import { user } from '../dao/User'
import { HTTP_CODES } from '../constants/RequestConstants'
import { Request as req, Response as res } from 'express'
import UploadedOnLocal from '../helper/upload'
import { userSchema } from '../validationSchemas/UserSchema'
import { logger } from '../logger/index'
import { unlink } from 'fs'
import path from 'path'

class UserController {
    public throwErr (): never {
        throw new Error('Something went wrong')
    }

    public async addUser (req: req, res: res): Promise<void> {
        try {
            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
            const value = userSchema.checkValidatidy(req.body)
            console.log('vlidation', value)
            if (req.files != null) {
                const fileUploadObj = new UploadedOnLocal()
                const fileName = fileUploadObj.uploadFile(req.files)
                req.body.profilePic = fileName
            } else {
                delete req.body.profilePic
            }
            // this.throwErr()
            await user.saveUser(req.body)
            res.status(HTTP_CODES.OK).send({ status: true, message: 'Data has been added successfully' })
        } catch (error) {
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: false, message: 'Internal server error' })
            logger.createLogs(error)
        }
    }

    public async getUser (req: req, res: res): Promise<void> {
        try {
            const userData = await user.getUserData()
            res.status(HTTP_CODES.OK).send({ data: userData })
        } catch (error) {
            logger.createLogs(error)
          res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: false, message: 'Internal server error' })
        }
    }

    public async updateData (req: req, res: res): Promise<void> {
        let fileName: string = ''
        try {
            if (req.files != null) {
                const fileUploadObj = new UploadedOnLocal()
                fileName = await fileUploadObj.uploadFile(req.files)
                req.body.profilePic = fileName
            } else {
                delete req.body.profilePic
            }
            // this.throwErr()
            await user.updateData(req.body.id, req.body)
            res.status(HTTP_CODES.OK).send({ status: true, message: 'Data has been updated successfully' })
        } catch (error) {
            logger.createLogs(error)
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: false, message: 'Internal server error' })
            if (fileName.length > 0) {
                const filePath = path.resolve(__dirname, '../upload', fileName)
                console.log('=======filePath=========', filePath)
                unlink(filePath, (error) => { console.log(error) })
            }
        }
    }

    public async deleteData (req: req, res: res): Promise<void> {
        try {
            await user.deleteData(req.params.id)

            res.status(HTTP_CODES.OK).send({ status: true, message: 'Data has been deleted successfully' })
        } catch (error) {
            logger.createLogs(error)
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: false, message: 'Internal server error' })
        }
    }
}

const userController: UserController = new UserController()
export { userController }
