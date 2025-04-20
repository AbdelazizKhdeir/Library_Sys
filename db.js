const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306  // Optional: you can also add this
});

connection.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to MySQL Database");
});

module.exports = connection;
