import bcrypt from 'bcrypt'
import { User, UserModel } from '../models/user.model'

export class UserService {
    public getAll = async () => await User.find({}, '-password')

    public create = async (userParams: UserModel) => {
        const { password, ...values } = userParams
        
        if (await User.findOne({ username: values.username })) {
            throw `Username ${values.username} is already taken`
        }

        if (await User.findOne({ email: values.email })) {
            throw `Email ${values.email} has already been registered`
        }

        const newUser = new User({
            ...values,
            password: bcrypt.hashSync(password, 10)
        })

        await newUser.save()

        return await this.findByUsername(values.username) 
    }

    public authenticate = async ({ username, password }: { username: string, password: string }) => {
        const user = await User.findOne({ username })
        if (user && bcrypt.compareSync(password, user.password)) {
            const { password, ...userWithoutPassword } = user.toObject()

            return userWithoutPassword
        } 
    }

    public update = async (id: number, userParams: UserModel) => {
        const user = await User.findById(id)
        
        if (!user) throw 'User not found'
        if (user.username !== userParams.username && await User.findOne({ username: userParams.username })) {
            throw `Username ${userParams.username} is already taken`
        }

        if (userParams.password) {
            userParams.password = bcrypt.hashSync(userParams.password, 10)
        }

        Object.assign(user, userParams)

        await user.save()
    }

    public findById = async (id: number) => await User.findById(id, '-password')
    public findByUsername = async (username: string) => await User.findOne({ username }, '-password')
}
