import mongoose from "mongoose";
import { array, object } from "zod";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    todos: Array
})

const userModel = mongoose.model("todoUser", userSchema)

export {
    userModel,
}