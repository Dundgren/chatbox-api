import { v4 as uuidv4 } from "uuid";
import { Db } from "./db";

export class Message {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    async addOne(message: string, user: string, id_:string=uuidv4()) {
        try {
            const sql = "INSERT INTO message (id, message, user) VALUES (?, ?, ?);";

            await this.db.query(sql, [id_, message, user]);
        } catch (err: unknown) {
            console.log(err);
            throw err;
        }
    }

    async findAll() {
        try {
            const sql = `SELECT message.id, message.message, message.timestamp, user.username, message.user
                        FROM message
                        JOIN user
                        ON message.user=user.id
                        ORDER BY timestamp ASC;`;
            const result = await this.db.query(sql);

            return result;
        } catch (err: unknown) {
            console.log(err);
            throw err;
        }
    }
}
