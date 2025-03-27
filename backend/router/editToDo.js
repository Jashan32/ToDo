import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userModel } from "../database/db.js";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const editRouter = Router();

editRouter.post('/add', async function (req, res) {

    const task = req.body.task
    const priority = req.body.priority
    const token = req.body.token
    const username = jwt.verify(token, JWT_SECRET)
    const user = await userModel.find({ username: username })

    if (user) {

        let presentTasks = user[0].todos
        const new_task = {
            task: task,
            priority: priority,
            completed: false
        }
        presentTasks = [new_task, ...(presentTasks || [])];
        const process = await userModel.updateOne({ username }, { todos: presentTasks })
        res.json({
            message: "done!"
        })
    }
    else {
        res.json({
            message: "user DNE"
        })
    }

})
editRouter.post("/delete", async function (req, res) {
    const task = req.body.task
    const token = req.body.token
    const username = jwt.verify(token, JWT_SECRET)
    const user = userModel.find({ username: username })

    if (user) {
        let presentTasks = user.todos
        presentTasks = presentTasks.filter(x => x.task != task)
        const process = await userModel.updateOne({ username }, { todos: presentTasks })
        res.json({
            message: "done!"
        })
    }
    else {
        res.json({
            message: "user DNE"
        })
    }

})
// editRouter.post("/toggle", async function (req, res) {
//     const task = req.bosy.task
//     const token = req.body.token
//     const username = jwt.verify(token, JWT_SECRET)
//     const user = userModel.find({ username: username })

//     if (user) {
//         let presentTasks = user.todos
//         presentTasks = presentTasks.filter(x => x.task != task)
//         const process = await userModel.updateOne({ username }, { todos: presentTasks })
//         res.json({
//             message: "done!"
//         })
//     }
//     else {
//         res.json({
//             message: "user DNE"
//         })
//     }

// })

export{
    editRouter
}
