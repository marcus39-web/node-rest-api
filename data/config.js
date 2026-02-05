"use strict";
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

console.log('Datenbankverbindung:', config);

const pool = mysql.createPool(config);

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Datenbankverbindung fehlgeschlagen:', err.message);
  } else {
    console.log('Datenbankverbindung erfolgreich!');
    connection.release();
  }
});

export default pool;
