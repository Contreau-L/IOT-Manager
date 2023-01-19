const getClient = require("./dbConnection").getClient;

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
      parsedData.phValue,
    ];
    await getClient().query(queryText, values);
    console.log(`Inserted log with mac address ${mac}`);
  } catch (err) {
    console.error(`Error inserting log: ${err}`);
  }
};

const insertNewDevice = async (mac) => {
  try{
    await getClient().query(`INSERT INTO "Device" ("id_mac","name","latitude","longitude") VALUES (${mac},'undefined','-1','-1')`);
  }catch(err){
    console.error(`Error inserting new device: ${err}`);
  }
};
module.exports = {
  insertData,
  insertNewDevice
};
