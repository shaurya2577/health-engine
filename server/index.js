const express = require("express");
const cors = require("cors");
const db = require("./db");
const constants = require("./constants");

const app = express();

//DATABASE_URL=postgres://oliver_blog_backend:Akq3ThqbLJ1skJL@oliver-blog-backend-db.flycast:5432/oliver_blog_backend?sslmode=disable

// middleware
app.use(cors());
app.use(express.json());

// ROUTES
app.post("/sample-route", async (req, res) => {
  return res.sendStatus(418);
});

app.get("/", async(req, res) => {
  res.send("Welcome to Health Engine Buddy")
})

app.listen(3002, () => {
  console.log("db listening on port 3002");
});
