import express from "express";
const app = express()
import cors from 'cors';
import { signupRouter } from "./router/signUp.js";
app.use(cors())
import mongoose from "mongoose";
import { signinRouter } from "./router/signin.js";
import { editRouter } from "./router/editToDo.js";
app.use(express.json()); 



app.use("/signup", signupRouter)
app.use("/signin", signinRouter)
app.use("/edit", editRouter)

const port = 3000;
async function main() {
    app.listen(port)
    await mongoose.connect(process.env.MONGO_URI)

}
main()