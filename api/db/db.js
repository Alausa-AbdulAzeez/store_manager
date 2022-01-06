const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: `Babatunde_1999`,
  host: "localhost",
  port: 5432,
  database: "store_manager",
});

module.exports = pool;

// const { Client } = require("pg");

// const client = new Client({
//   user: "postgres",
//   password: `Babatunde_1999`,
//   host: "localhost",
//   port: 5432,
//   database: "store_manager",
// });

// client.on("connect", () => {
//   console.log("connected to the db");
// });
// client.on("end", () => {
//   console.log("connection ended");
// });

// module.exports = client;
