import { v4 as uuidv4 } from 'uuid';

export class Message {
    private db: any;

    constructor(db: any) {
        this.db = db;
    }

    async addMessage(message: string, user: string, id_:string=uuidv4()) {
        try {
            const sql = "INSERT INTO message (id, message, user) VALUES (?, ?, ?);";

            this.db.query(sql, [id_, message, user], (error: any, results: any) => {
                if (error) throw error;
                console.log(results);
            });
        } catch (err: any) {
            console.log(err);
        }

    }
}
