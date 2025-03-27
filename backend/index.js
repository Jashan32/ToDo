import express from "express";
const app = express()
import cors from 'cors';
import { signupRouter } from "./router/signUp.js";
app.use(cors())
import mongoose from "mongoose";


app.use("/signup", signupRouter)

const port = 3000;
async function main() {
    app.listen(port)
    await mongoose.connect(process.env.MONGO_URI)

}
main()