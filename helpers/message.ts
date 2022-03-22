import { v4 as uuidv4 } from 'uuid';

export class Message {
    readonly id_: string;
    readonly username: string;
    readonly message: string;
    readonly timestamp: number;

    constructor(username: string, message: string) {
        this.id_ = uuidv4();
        this.username = username;
        this.message = message;
        this.timestamp = Date.now()
    }
}
