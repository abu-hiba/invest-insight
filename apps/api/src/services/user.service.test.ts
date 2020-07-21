import 'mocha'
import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import { expect, assert } from 'chai'
import { UserService } from './user.service'
import { UserModel } from '../models/user.model'
import { after } from 'mocha'

beforeEach(done => {
    mongoose.connect('mongodb://mongo-server:27017/InvestInsightTest', done)
})

afterEach(done => mongoose.connection.dropDatabase(() =>
    mongoose.connection.close(() => done())
))

after(done => mongoose.connection.dropDatabase(() =>
    mongoose.connection.close(() => done())
))

describe('User Service', () => {
    const User = new UserService()

    const testUser1 = <UserModel>{
        username: 'user1',
        email: 'user1@mail.com',
        password: 'p4ssw0rd'
    }

    const testUser2 = <UserModel>{
        username: 'user2',
        email: 'user2@mail.com',
        password: 'p4ssw0rd'
    }

    describe('Create', () => {
        it('inserts a new user in the database', async () => {
            await User.create(testUser1)

            const user1 = await User.findByUsername('user1')

            expect(user1?.username).to.equal('user1')
            expect(user1?.email).to.equal('user1@mail.com')
            expect(user1).not.to.have.key('password')
        })

        it('throws an error when email is already in use', async () => {
            await User.create(testUser1)

            const user2 = await User.create(<UserModel>{
                username: 'user2',
                email: 'user1@mail.com',
                password: 'p4ssw0rd'
            }).catch(err => err)

            expect(user2).to.equal('Email user1@mail.com has already been registered')
        })

        it('throws an error when username is already in use', async () => {
            await User.create(testUser1)

            const user2 = await User.create(<UserModel>{
                username: 'user1',
                email: 'user2@mail.com',
                password: 'p4ssw0rd'
            }).catch(err => err)

            expect(user2).to.equal('Username user1 is already taken')
        })
    })
    
    describe('Authenticate', () => {
        it('returns a user object if user exists and password is correct', async () => {
            const user1 = await User.create(testUser1)

            const result = await User.authenticate({
                username: 'user1',
                password: 'p4ssw0rd'
            })

            assert.deepEqual(result, <UserModel>{
                _id: user1._id,
                username: user1.username,
                email: user1.email,
                dateCreated: user1.dateCreated,
            })
        })

        it('returns null when user is not found', async () => {
            const result = await User.authenticate({
                username: 'user1',
                password: 'p4ssw0rd'
            })

            expect(result).to.be.null
        })

        it('returns null when password is incorrect', async () => {
            await User.create(testUser1)

            const result = await User.authenticate({
                username: 'user1',
                password: 'password'
            })

            expect(result).to.be.null
        })
    })

    describe('Update', () => {
        it('updates user details', async () => {
            const testUser = await User.create(testUser1)

            const before = await User.findByUsername('user1')

            await User.update(testUser._id, <UserModel>{
                username: 'user2',
                email: 'user2@mail.com'
            })

            const after = await User.findById(testUser._id)
            
            expect(after?.username).to.equal('user2')
            expect(after?.email).to.equal('user2@mail.com')
            expect(after).not.to.have.key('password')
            assert.notDeepEqual(after, before)
        })

        it('throws an error if user not found', async () => {
            const result = await User.update(new ObjectId('5ed13cfd62b2e1001bad35c8'), <UserModel>{
                username: 'user2',
                email: 'user2@mail.com'
            }).catch(err => err)
            
            expect(result).to.equal('User not found')
        })

        it('throws an error if updated username is taken', async () => {
            const user1 = await User.create(testUser1)

            const user2 = await User.create(testUser2)

            const before = await User.findByUsername('user2')

            const update = await User.update(user2._id, <UserModel>{
                username: user1.username
            }).catch(err => err)

            const after = await User.findByUsername('user2')

            expect(update).to.equal(`Username ${user1.username} is already taken`)
            assert.deepEqual(after, before)
        })

        it('throws an error if updated email is taken', async () => {
            const user1 = await User.create(testUser1)

            const user2 = await User.create(testUser2)

            const before = await User.findByUsername('user2')

            const result = await User.update(user2._id, <UserModel>{
                email: user1.email
            }).catch(err => err)

            const after = await User.findByUsername('user2')

            expect(result).to.equal(`Email ${user1.email} is already taken`)
            assert.deepEqual(after, before)
        })

        it('updates password', async () => {
            const user1 = await User.create(testUser1)

            await User.update(user1._id, <UserModel>{ password: 'pa55word' })

            const failedAuth = await User.authenticate({
                username: user1.username,
                password: 'p4ssw0rd'
            })

            const successfulAuth = await User.authenticate({
                username: user1.username,
                password: 'pa55word'
            })

            expect(failedAuth).to.be.null
            assert.deepEqual(successfulAuth, <UserModel>{
                _id: user1._id,
                username: user1.username,
                email: user1.email,
                dateCreated: user1.dateCreated
            })
        })
    })
})