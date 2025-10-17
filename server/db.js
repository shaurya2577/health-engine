require('dotenv').config();
const Pool = require("pg").Pool;

// Database configuration with environment variables
let pool;

if (process.env.DATABASE_URL) {
  // Production configuration
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
} else {
  // Development configuration
  pool = new Pool({
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "1104AInnov8!",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5433,
    database: process.env.DB_NAME || "resourcedatabase",
  });
}

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
  process.exit(-1);
});

module.exports = pool;
