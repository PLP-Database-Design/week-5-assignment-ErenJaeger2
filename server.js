// Initialise dependencies

const express = require("express");
const app = express();
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(express.json());
app.use(cors());
dotenv.config();

// Connect to the Database - MOST CRUCIAL PART

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    console.error("Error code:", err.code);
    console.error("SQL state:", err.sqlState);
    console.error("Fatal error:", err.fatal);
    return;
  }
  console.log("Connected to the MySQL database.");
});

//Your code goes here
//GET METHOD example

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Question 1
app.get("/patients", (req, res) => {
  db.query("SELECT * FROM patients", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data");
    } else {
      console.log(results);
      // Display the records to the browser
      res.render("patients", { results: results });
    }
  });
});

// Question 2
app.get("/providers", (req, res) => {
  db.query("SELECT * FROM providers", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data");
    } else {
      console.log(results);
      // Display the records to the browser
      res.render("providers", { results: results });
    }
  });
});

// Question 3
app.get("/patientfirstname", (req, res) => {
  db.query("SELECT first_name FROM patients", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data");
    } else {
      console.log(results);
      // Display the records to the browser
      res.render("patientfirstname", { results: results });
    }
  });
});

// Question 4
app.get("/providersspecialty", (req, res) => {
  db.query("SELECT provider_specialty FROM providers", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data");
    } else {
      console.log(results);
      // Display the records to the browser
      res.render("providersspecialty", { results: results });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
