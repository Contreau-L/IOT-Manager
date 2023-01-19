const { client } = require("./dbConnection");

const insertData = async (mac, parsedData) => {
  try {
    const queryText = `INSERT INTO Logs (fk_device, water_temperature, water_level, occurred_at, added_at, ph)
                           VALUES ($1, $2, $3, $4, NOW(), $5)`;
    const addedAt = new Date().toISOString();
    const values = [
      mac,
      parsedData.waterTemperature,
      parsedData.waterLevel,
      parsedData.occurredAt,
      addedAt,
      parsedData.phValue,
    ];
    await client.query(queryText, values);
    console.log(`Inserted log with mac address ${mac}`);
  } catch (err) {
    console.error(`Error inserting log: ${err}`);
  }
};

const insertNewDevice = async (mac) => {
  await client.query(`INSERT INTO "Device" ("id_mac") VALUES (${mac})`);
};
module.exports = {
  insertData,
};
