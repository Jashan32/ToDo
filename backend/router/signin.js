import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userModel } from "../database/db.js";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const signinRouter = Router();
signinRouter.post("/", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const emailExist = await userModel.findOne({ email: email })

    if (emailExist) {
        bcrypt.compare(password, emailExist.password, (err, isMatch) => {
            if (err) {
                res.json({
                    message: "invalid credentials"
                })
                return

            }
            if (isMatch) {

                const token = jwt.sign(emailExist.username, JWT_SECRET)
                res.json({
                    message: "signin sucess",
                    token: token
                })

            }
        })
    }
    else {
        res.json({
            message: "invalid credentials"
        })
    }

})

export {
    signinRouter
}