import mysql from 'promise-mysql';

export class Db {
    readonly config: Record<string, unknown>;

    constructor() {
        this.config = {
            host:     process.env.RDS_HOSTNAME,
            port:     process.env.RDS_PORT,
            user:     process.env.RDS_USERNAME,
            password: process.env.RDS_PASSWORD,
            database: process.env.RDS_DB_NAME,
            multipleStatements: true
        };
    }

    async query(sql: string, params: string[] = []) {
        const connection = await mysql.createConnection(this.config);
        const result = await connection.query(sql, params);

        return result;
    }
}
