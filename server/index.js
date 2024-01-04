const express = require("express");
const cors = require("cors");
const db = require("./db");
const constants = require("./constants");
const pool = require("./db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// create a new resource
app.post("/newResource", async (req, res) => {
  const { description, title, tag } = req.body;
  if (!description || !title || !tag) {
    return res.status(400).send("Input is not formatted properly");
  }

  try {
    const newResource = await pool.query(
      "INSERT INTO resources (description, title, class) VALUES($1, $2, $3) RETURNING *;",
      [description, title, tag]
    );

    res.json(newResource.rows[0]);
  } catch (error) {
    res.status(500).send("Server or database error");
  }
});

// get all resources
app.get("/resources", async (_req, res) => {
  try {
    const allResources = await pool.query("SELECT * FROM resources;");
    res.json(allResources.rows);
  } catch (error) {
    res.status(500).send("Server or database error");
  }
});

// see one resource
app.get("/resources/:resourceID", async (req, res) => {
  const { resource_id } = req.params;
  if (!resource_id) {
    return res.status(400).send("Input is not formatted properly");
  }

  try {
    const resource_fetch = await pool.query(
      "SELECT * FROM resources WHERE resource_id = $1;",
      [resource_id]
    );
    res.json(resource_fetch.rows[0]);
  } catch (error) {
    res.status(500).send("Server or database error");
  }
});

app.listen(3002, () => {
  console.log("db listening on port 3002");
});
