import 'mocha'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { UserService } from './user.service'
import { UserModel } from '../models/user.model'

beforeEach(done => {
    mongoose.connect('mongodb://mongo-server:27017/InvestInsightTest', done)
})

afterEach(done => {
   mongoose.connection.dropDatabase(() => {
       mongoose.connection.close(() => {
           done()
       })
   }) 
})

describe('User Service', () => {
    const User = new UserService()

    describe('Create', () => {
        it('inserts a new user in the database', async () => {
            const result = await User.create(<UserModel>{
                username: 'testuser',
                email: 'test@mail.com',
                password: 'p4ssw0rd'
            })

            expect(result.username).to.equal('testuser')
            expect(result.email).to.equal('test@mail.com')
        })

        it('throws an error when an email is already in use', async () => {
            await User.create(<UserModel>{
                username: 'user1',
                email: 'user1@mail.com',
                password: 'p4ssw0rd'
            })

            const user2 = await User.create(<UserModel>{
                username: 'user2',
                email: 'user1@mail.com',
                password: 'p4ssw0rd'
            }).catch(err => err)

            expect(user2).to.equal('Email user1@mail.com has already been registered')
        })

        it('throws an error when a username is already in use', async () => {
            await User.create(<UserModel>{
                username: 'user1',
                email: 'user1@mail.com',
                password: 'p4ssw0rd'
            })

            const user2 = await User.create(<UserModel>{
                username: 'user1',
                email: 'user2@mail.com',
                password: 'p4ssw0rd'
            }).catch(err => err)

            expect(user2).to.equal('Username user1 is already taken')
        })
    })
    
})