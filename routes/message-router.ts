import express from "express";
import { MessageHandler } from "../helpers/message-handler";

export const messageRouter = express.Router();
const messageHandler = new MessageHandler();

messageRouter.get("/", (req, res) => {
    res.send(messageHandler.messages);
});

messageRouter.post("/", (req, res) => {
    messageHandler.addMessage(req.body.username, req.body.message);
    
    res.send("Added message");
});
