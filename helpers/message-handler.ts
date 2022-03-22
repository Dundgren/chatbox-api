import { Message } from "./message"

export class MessageHandler {
    private _messages: Message[];

    constructor() {
        this._messages = []
    }

    get messages() {
        return this._messages;
    }

    addMessage(username: string, message: string): void {
        this._messages.push(new Message(username, message));
    }
}
