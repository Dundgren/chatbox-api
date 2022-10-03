import express from "express";
import bcrypt from "bcrypt";
import { Db } from "../helpers/db";
import { User } from "../helpers/user";


export const userRouter = express.Router();

const db = new Db();
const userHandler = new User(db);

userRouter.post("/", async (req, res) => {
    try {
        const user = {
            id: "",
            username: req.body.username,
            password: req.body.password,
            age: req.body.age,
            sex: req.body.sex,
            location: req.body.location,
        }

        const hashedPassword = await userHandler.hashPassword(user.password);

        user.password = hashedPassword;
        await userHandler.addOne(user);
    
        res.status(201).json({ Message: "Added user" });
    } catch (err: any) {
        let statusCode = 500;
        let message = "Internal server error";

        if (err.code == "ER_BAD_NULL_ERROR") {
            statusCode = 400;
            message = "Missing parameter(s)";
        } else if (err.code == "ER_DUP_ENTRY") {
            statusCode = 400;
            message = "Duplicate entry";
        }

        res.status(statusCode).json({ message: message });
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        const user = await userHandler.findOne(req.body.username);

        // Placing user check first avoids error if one isn't found.
        // User and password check in the same if-statement as to not differentiate between fails.
        if (user[0] && await bcrypt.compare(req.body.password, user[0].password)) {
            res.status(200).json(user[0]);
        } else {
            res.status(401).json({ message: "Login failed" });
        }
    } catch (err: unknown) {
        res.status(500).json({ message: "Internal server error" });
    }
});
