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
            const sql = "SELECT * FROM message";
            const result = await this.db.query(sql);

            return result;
        } catch (err: unknown) {
            console.log(err);
            throw err;
        }
    }
}
