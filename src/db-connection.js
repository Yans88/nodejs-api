import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWOR,
    database: process.env.MYSQL_NAME,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
});

export default pool;
