const express = require("express");
const cors = require("cors");
const db = require("./db");
const constants = require("./constants");
const pool = require("./db");

const app = express();

//DATABASE_URL=postgres://oliver_blog_backend:Akq3ThqbLJ1skJL@oliver-blog-backend-db.flycast:5432/oliver_blog_backend?sslmode=disable

// middleware
app.use(cors());
app.use(express.json());


// create a new resource
app.post('/newResource', async (req, res) => {
  const { description } = req.body;
  const { title } = req.body;
  const { tag } = req.body;
  const newResource = await pool.query("INSERT INTO resources (description, title, class) VALUES($1, $2, $3) RETURNING *", [description, title, tag]);

  res.json(newResource.rows[0]);
})


// get all resources 
app.get("/resources", async (req, res) => {
  const allResources = await pool.query("SELECT * FROM resources");
  res.json(allResources.rows);
})

// see one resource
app.get('/resources/:resourceID', async (req, res) => {
  const { resourceID } = req.params;
  const resource_fetch = await pool.query("SELECT * FROM resources WHERE resource_id = $1", [resourceID]);
  res.json(resource_fetch.rows[0]);
})

app.get("/", async(req, res) => {
  res.send("Welcome to Health Engine Buddy");
})

app.listen(3002, () => {
  console.log("db listening on port 3002");
});
