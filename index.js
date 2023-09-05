const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbConnection } = require("./database/config");

// create express server
const app = express();

// database connection
dbConnection();

// CORS
app.use(cors());

// public directory
app.use(express.static("public"));

// read and parse request on json format. body
app.use(express.json());

// ROUTES
// auth
app.use("/api/auth", require("./routes/auth"));
// CRUD:Events
app.use("/api/events", require("./routes/events"));
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// listen request
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
