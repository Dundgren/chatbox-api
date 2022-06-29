const mysql = require('mysql');


export class Db {
    readonly connection: any;

    constructor() {
        this.connection = mysql.createConnection({
            host:     process.env.RDS_HOSTNAME,
            port:     process.env.RDS_PORT,
            user:     process.env.RDS_USERNAME,
            password: process.env.RDS_PASSWORD,
            database: process.env.RDS_DB_NAME,
            multipleStatements: true
        });

        this.connection.connect(function(err: any) {
            if (err) {
              console.error('error connecting: ' + err.stack);
              return;
            }

            console.log("Connected to DB");
        });
    }
}
