import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userModel } from "../database/db.js";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;



const signupRouter = Router();
signupRouter.post("/", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username

    const toParse = {
        username: username,
        email: email,
        password: password
    }

    const credentailsSchema = z.object({
        username: z.string().min(4, { message: "username must be atleast 4 characters long" }),
        email: z.string().email({ message: "Invalid email format" }),
        password: z.string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/\d/, { message: "Password must contain at least one number" })
            .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" })
    });

    const result = credentailsSchema.safeParse(toParse);
    if (!result.success) {
        res.json({
            message: result.error.format()
        })
    }
    else {

        const email_alredyExist = await userModel.findOne({ email: email })
        const username_alredyExist = await userModel.findOne({ username: username })
        if (email_alredyExist || username_alredyExist) {
            res.json({
                message:"user already exist"
            })
        }
        else {
            const hashedPass = await bcrypt.hash(password, 1)
            userModel.create({
                username: username,
                email: email,
                password: hashedPass
            })
            const resToken = jwt.sign(username, JWT_SECRET)
            res.json({
                message: "signup sucessful",
                token: resToken
            })
        }

    }


})

export {
    signupRouter
}