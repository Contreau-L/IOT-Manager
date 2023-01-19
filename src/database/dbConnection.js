const { Client } = require("pg");
require("dotenv").config();
let client = null;

const connectToDb = () => {
  try {
    client = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
    client.connect();
    console.log("Connected to the Database");
  } catch (err) {
    console.error(`Error connecting to the DB ${err}`);
  }
};

const endDbConnection = () => {
  client.end();
};

module.exports = { connectToDb, endDbConnection, client };
