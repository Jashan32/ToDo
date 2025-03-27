import mongoose from "mongoose";
import { array, object } from "zod";
const Schema = mongoose.Schema;

const userSchema = {
    username: String,
    email: String,
    password: String,
    todos: Array
}