import express from 'express'
import { Controller } from '../interfaces/controller.interface'
import { UserService } from '../services/user.service'

export class UserController implements Controller {
    private service: UserService
    public router = express.Router()

    constructor() {
        this.service = new UserService()
        this.routes()
    }

    private routes() {
        this.router.get("/user/all", this.service.getAll)
        this.router.post("/user", this.service.create)
        this.router.get("/user/:id", this.service.findById)
        this.router.put("/user/:id", this.service.update)
    }
}
