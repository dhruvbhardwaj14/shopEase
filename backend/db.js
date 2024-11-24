const mysql = require("mysql2");

// Create a connection to the database
const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com", // Replace with your DB host (e.g., 'sqlXX.freemysqlhosting.net' for FreeMySQLDatabase)
  user: "sql12746119", // Replace with your DB username
  password: "njceCDXklM", // Replace with your DB password
  database: "sql12746119", // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("Connected to the database.");
});

module.exports = db;
