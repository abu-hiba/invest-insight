import mongoose from 'mongoose'

export class Database {
    public setConfig() {
        mongoose.Promise = global.Promise
        mongoose.connect(`${process.env.MONGO_URL}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
}
