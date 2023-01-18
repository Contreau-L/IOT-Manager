const { client } = require('./dbConnection');

const insertData = async (mac, parsedData) => {
//   try {
//     const query = `INSERT INTO logs (fk_device, water_temperature, water_level, published_date, ph)
//                    VALUES ($1, $2, $3, $4, $5)`;
//     const values = [mac, parsedData.waterTemperature, waterLevel, publishedDate, ph];
//     await client.query(query, values);
//     console.log(`Data inserted successfully`);
//   } catch (err) {
//     console.error(`Error inserting data: ${err}`);
//   }
};

module.exports = {
  insertData
};