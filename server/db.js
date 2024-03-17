const Pool = require("pg").Pool;

// for local testing, change user and password as needed
const pool = new Pool({
 user: "postgres",
 password: "1104AInnov8!",
 host: "localhost",
 port: 5433,
 database: "resourcedatabase",
});

// const pool = new Pool({
//   user: "postgres",
//   password: "oliverye77",
//   host: "localhost",
//   port: 5432,
//   database: "resourcedatabase",
// });

// uncomment for production
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

module.exports = pool;
