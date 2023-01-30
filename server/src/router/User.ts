// eslint-disable-next-line @typescript-eslint/quotes
import { Request as req, Response as res, Router } from "express"
import { userController } from '../controller/UserController'
class User {
    public router: Router
    constructor () {
        this.router = Router()
        this.mountRouter()
    }

    private mountRouter (): void {
        this.router.get('/', userController.getUser)
        this.router.post('/', userController.addUser)
        this.router.delete('/:id', userController.deleteData)
        this.router.patch('/', userController.updateData)
    }

    public getRouter (): any {
        return this.router
    }
}

const user: User = new User()
export { user }
