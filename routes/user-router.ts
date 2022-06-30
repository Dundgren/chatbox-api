import express from "express";
import { Db } from "../helpers/db";
import { User } from "../helpers/user";

export const userRouter = express.Router();

const db = new Db();
const userHandler = new User(db);

// userRouter.get("/", async (req, res) => {
//     try {
//         const users = await userHandler.findAll();

//         res.status(200).json(users);
//     } catch {
//         res.status(500).json({ user: "Internal Server Error" });
//     }
// });

userRouter.post("/", async (req, res) => {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password,
            age: req.body.age,
            sex: req.body.sex,
            location: req.body.location,
        }

        await userHandler.register(user);
    
        res.status(201).json({ Message: "Added user" });
    } catch (err: any) {
        let statusCode = 500;
        let message = "Internal server error";

        if (err.code == "ER_BAD_NULL_ERROR") {
            statusCode = 400;
            message = "Missing parameter(s)";
        }

        res.status(statusCode).json({ Message: message });
    }
});
