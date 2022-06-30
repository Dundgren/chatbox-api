import { v4 as uuidv4 } from "uuid";
import { Db } from "./db";
import bcrypt from "bcrypt";

export class User {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    // TODO: Make addOne accept an object that fits a template instead.
    async addOne(user: Record<string, string>) {
        try {
            const sql = "INSERT INTO user (id, username, age, sex, location, password) VALUES (?, ?, ?, ?, ?, ?);";

            user.id = uuidv4();
            await this.db.query(sql, [user.id, user.username, user.age, user.sex, user.location, user.password]);
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

    async register(user: Record<string, string>) {
        const saltRounds = 10;

        // TODO: Catch the error in the callback and propagate it
        try {
            bcrypt.hash(user.password, saltRounds, async (err, hash) => {
                if (err) throw err;
    
                user.password = hash;
                await this.addOne(user);
            });
        } catch (err: unknown) {
            throw err;
        }

    }
}
