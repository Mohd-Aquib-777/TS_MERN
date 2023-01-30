import { user } from '../dao/User'
import { HTTP_CODES } from '../constants/RequestConstants'
import { Request as req, Response as res } from 'express'

class UserController {
    public async addUser (req: req, res: res): Promise<void> {
        try {
            const result = await user.saveUser(req.body)
            res.status(HTTP_CODES.OK).send({ status: true, message: 'Data has been added successfully' })
        } catch (error) {
            console.log('ERROR:', error)
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: false, message: 'Internal server error' })
        }
    }

    public async getUser (req: req, res: res): Promise<void> {
        try {
            const userData = await user.getUserData()
            res.status(HTTP_CODES.OK).send({ data: userData })
        } catch (error) {
          console.log('ERROR:', error)
          res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: false, message: 'Internal server error' })
        }
    }

    public async updateData (req: req, res: res): Promise<void> {
        try {
            const result = await user.updateData(req.body.id, req.body)
            res.status(HTTP_CODES.OK).send({ status: true, message: 'Data has been updated successfully' })
        } catch (error) {
            console.log('ERROR: ', error)
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: false, message: 'Internal server error' })
        }
    }

    public async deleteData (req: req, res: res): Promise<void> {
        try {
            console.log('====================')
            console.log('query data ', req.params)
            const result = await user.deleteData(req.params.id)
            // if (result.result.ok) {
                res.status(HTTP_CODES.OK).send({ status: true, message: 'Data has been deleted successfully' })
            // } else {
                // res.status(HTTP_CODES.NOT_FOUND).send({ message: 'NOT_FOUND' })
            // }
        } catch (error) {
            console.log('ERROR: ', error)
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ status: false, message: 'Internal server error' })
        }
    }
}

const userController: UserController = new UserController()
export { userController }
