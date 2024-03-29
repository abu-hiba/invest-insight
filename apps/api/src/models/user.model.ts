import { Schema, model, Document, Model } from 'mongoose'

export interface UserModel extends Document {
    username: string,
    email: string,
    password: string,
    dateCreated: Date,
    watchlist: string[]
}

export const UserSchema: Schema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    watchlist: { type: [String], default: [] }
})

export const User: Model<UserModel> = model("User", UserSchema)
