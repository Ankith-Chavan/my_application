const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3002;
// ADD THIS
var cors = require("cors");
app.use(cors());

// Create MySQL connection
const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "data_ent_app",
});

// Connect to MySQL
con.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Middleware to parse JSON requests
app.use(express.json());

// POST route to insert data into MySQL database
app.post("/", (req, res) => {
  const sql =
    "INSERT INTO logins_app(name, email, age, city, phone, occupation , gender , zipcode, message, subscribe) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.city,
    req.body.phone,
    req.body.occupation,
    req.body.gender,
    req.body.zipcode,
    req.body.message,
    req.body.subscribe,
  ];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data into database:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log("Data inserted successfully");
    res.json(result);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
