import 'mocha'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { UserService } from './user.service'
import { UserModel } from '../models/user.model'

beforeEach(function(done) {
    mongoose.connect('mongodb://mongo-server:27017/InvestInsightTest', done)
})

afterEach(function(done) {
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
    })
    
})