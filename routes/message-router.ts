import express from "express";
import { MessageHandler } from "../helpers/message-handler";

export const messageRouter = express.Router();
const messageHandler = new MessageHandler();

messageRouter.get("/", (req, res) => {
    try {
        const messages = messageHandler.messages;

        res.status(200).json(messages);
    } catch {
        res.status(500).json({ message: "Internal Server Error" });
    }

});

messageRouter.post("/", (req, res) => {
    try {
        messageHandler.addMessage(req.body.username, req.body.message);
    
        res.status(201).json("Added message");
    } catch (err: any) {
        res.status(500).json({ message: "Internal Server Error" });
    }

});
