import { v4 as uuidv4 } from "uuid";
import { Db } from "./db";
import bcrypt from "bcrypt";

export class User {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    async addOne(user: {
        id: string;
        username: string;
        age: string;
        sex: string;
        location: string;
        password: string;
    }) {
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

    async hashPassword(password: string) {
        const saltRounds = 10;

        const hashedPassword: string = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function(err, hash) {
              if (err) reject(err)
              resolve(hash)
            });
          })

        return hashedPassword;
    }
}
