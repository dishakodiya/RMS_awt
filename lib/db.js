import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});
await db.execute(
  "INSERT INTO users (name, email, role, password) VALUES (?, ?, ?, ?)",
  ['meri', 'meri@gmail.com', 'Approver', 'temp123']
);
export default db;