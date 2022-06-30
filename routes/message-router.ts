import express from "express";
import { Db } from "../helpers/db";
import { Message } from "../helpers/message";

export const messageRouter = express.Router();

const db = new Db();
const messageHandler = new Message(db);

messageRouter.get("/", async (req, res) => {
    try {
        const messages = await messageHandler.findAll();

        res.status(200).json(messages);
    } catch {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

messageRouter.post("/", async (req, res) => {
    try {
        await messageHandler.addOne(req.body.message, req.body.user);
    
        res.status(201).json({ message: "Added message" });
    } catch (err: any) {
        let statusCode = 500;
        let message = "Internal server error";

        if (err.code == "ER_BAD_NULL_ERROR") {
            statusCode = 400;
            message = "Missing parameter(s)";
        }

        res.status(statusCode).json({ message: message });
    }
});
