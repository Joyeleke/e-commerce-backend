const { Pool } = require("pg");
require("dotenv").config();


const dbHost = process.env.PGHOST;
const dbUser = process.env.PGUSER;
const dbPassword = process.env.PGPASSWORD;
const dbPort = process.env.PGPORT;
const dbDatabase = process.env.PGDATABASE;

const pool = new Pool({
  host: dbHost,
  user: dbUser,
  database: dbDatabase,
  password: dbPassword,
  port: dbPort,
});

const query = (text, params) => pool.query(text, params);
module.exports = {query};
