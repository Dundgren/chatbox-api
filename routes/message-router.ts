import express from "express";
import { Db } from "../helpers/db";
import { Message } from "../helpers/message";

export const messageRouter = express.Router();

const db = new Db();
const messageHandler = new Message(db.connection);

// messageRouter.get("/", (req, res) => {
//     try {
//         const messages = messageHandler.messages;

//         res.status(200).json(messages);
//     } catch {
//         res.status(500).json({ message: "Internal Server Error" });
//     }

// });

messageRouter.post("/", (req, res) => {
    try {
        messageHandler.addMessage(req.body.message, req.body.user);
    
        res.status(201).json("Added message");
    } catch (err: any) {
        res.status(500).json({ message: "Internal Server Error" });
    }

});
