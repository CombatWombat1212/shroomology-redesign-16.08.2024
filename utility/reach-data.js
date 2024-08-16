// Import necessary packages
const mysql = require('mysql2');
require('dotenv').config();

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    return console.error('Error connecting: ' + err.stack);
  }
  console.log('Connected as id ' + connection.threadId);

  // Query to get all table names
  connection.query('SHOW TABLES', (error, results, fields) => {
    if (error) throw error;

    // Print the names of all tables
    results.forEach((row) => {
      console.log(Object.values(row)[0]);
    });

    // Close the connection
    connection.end();
  });
});
