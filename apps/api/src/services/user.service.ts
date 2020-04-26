import { Request, Response } from 'express'
import { MongooseDocument } from 'mongoose'
import { User } from '../models/user.model'

export class UserService {
    public getAll(req: Request, res: Response) {
        User.find({}, (error: Error, user: MongooseDocument) => {
            if (error) {
                res.send(error)
            }
            res.json(user)
        })
    }

    public create(req: Request, res: Response) {
        const newUser = new User(req.body)
        newUser.save((error: Error, user: MongooseDocument) => {
            if (error) {
                res.send(error)
            }
            res.json(user)
        })
    }

    public update(req: Request, res: Response) {
        const { id } = req.params
        User.findByIdAndUpdate(id, req.body, (error: Error, user: any) => {
            if (error) {
                res.send(error)
            }
            const message = user ? 'Updated successfully' : 'User not found'
            res.send(message)
        })
    }


    public findById(req: Request, res: Response) {
        const { id } = req.params
        User.findById(id, (error: Error, user: MongooseDocument) => {
            if (error) {
                res.send(error)
            }
            res.json(user)
        })
    }
}
