import mysql2 from "mysql2";

let conn = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

conn.connect((err) => {
    if (err) throw err;
    console.log("Connected with MySql")
})

export = conn

