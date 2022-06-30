import { v4 as uuidv4 } from "uuid";
import { Db } from "./db";
import bcrypt from "bcrypt";

export class Message {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    // Todo: Make addOne accept an object that fits a template instead.
    async addOne(username: string, age: number, sex: string, location: string, password: string, id_:string=uuidv4()) {
        try {
            const sql = "INSERT INTO user (id, username, age, sex, location, password) VALUES (?, ?, ?, ?, ?, ?, ?);";

            await this.db.query(sql, [id_, username, age.toString(), sex, location, password]);
        } catch (err: unknown) {
            console.log(err);
            throw err;
        }
    }

    async findOne(username: string) {
        try {
            const sql = "SELECT * FROM user WHERE username = ?";
            const result = await this.db.query(sql, [username]);

            return result;
        } catch (err: unknown) {
            console.log(err);
            throw err;
        }
    }

    async register(username: string, age: number, sex: string, location: string, password: string) {
        const saltRounds = 10;

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) throw err;

            this.addOne(username, age, sex, location, hash);
        });
    }
}
