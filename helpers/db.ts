import mysql from 'mysql2/promise';

export class Db {
    readonly config: Record<string, any>;

    constructor() {
        // this.config = {
        //     host:     process.env.RDS_HOSTNAME,
        //     port:     process.env.RDS_PORT,
        //     user:     process.env.RDS_USERNAME,
        //     password: process.env.RDS_PASSWORD,
        //     database: process.env.RDS_DB_NAME,
        //     multipleStatements: true
        // };
        this.config = {
            host: process.env.DATABASE_URL
        }
    }

    async query(sql: string, params: string[] = []) {
        const connection =  await mysql.createConnection(this.config.host);
        const [rows, fields]: any = await connection.execute(sql, params);
        console.log(rows)
        connection.end();

        return rows;
    }
}
