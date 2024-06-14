// Get the client
import mysql from 'mysql2';
import { configDotenv } from "dotenv";
configDotenv();

// Create the connection to database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: 'root',
  password: 'root',
  timezone: 'Asia/Seoul',
  database: 'BookShop',
  dateStrings: true,
});

module.exports = pool;