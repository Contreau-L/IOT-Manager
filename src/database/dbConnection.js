const { Client } = require('pg');
let client = null;

const connectToDb = () => {
  try {
    client = new Client({
      user: 'contreaul',
      host: '51.83.41.102',
      database: 'contreaul',
      password: 'contreaul',
      port: 5432,
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

module.exports =  { connectToDb, endDbConnection , client };