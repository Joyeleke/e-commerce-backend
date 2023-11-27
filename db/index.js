const { Pool } = require("pg");
require("dotenv").config({path: '../.env'});

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

async function test() {
  const client = await pool.connect();
  const res = await client.query("SELECT * FROM users");
  console.log(res.rows[0]);
}

test();
