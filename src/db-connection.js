import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.DB_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DBNAME,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
});

export default pool;
