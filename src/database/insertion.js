const getClient = require("./dbConnection").getClient;

const insertData = async (mac, parsedData) => {
  try {
    const queryText = `INSERT INTO "Logs" (fk_device, water_temperature, water_level, occurred_at, added_at, ph)
                           VALUES ($1, $2, $3, $4, NOW(), $5) RETURNING id`;
    const values = [
      mac,
      parsedData.waterTemperature,
      parsedData.waterLevel,
      parsedData.occurredAt,
      parsedData.phValue,
    ];

    const { rows } = await getClient().query(queryText, values);
    const logId = rows[0].id;
    console.log(`Inserted log with mac address ${mac}`);
    return logId;
  } catch (err) {
    console.error(`Error inserting log: ${err}`);
    return -1;
  }
};

const insertNewDevice = async (mac) => {
  try {
    const { rows } = await getClient().query(
      `INSERT INTO "Device" ("id_mac","name","latitude","longitude") VALUES (${mac},'undefined','-1','-1')`
    );
  } catch (err) {
    console.error(`Error inserting new device: ${err}`);
  }
};

const insertNewHumiditySensor = async (mac,line) => {
  try {
    const { rows } = await getClient().query( `INSERT INTO "GardenLine" (fk_device,vegetable_type,humidity_threshold,line_index) VALUES (${mac},'undefined','50','${line}')` );
  }
  catch (err) {
    console.error(`Error inserting new humidity sensor: ${err}`);
  }

}

const insertConnectionHistory = async (mac) => {
  try{
    const { rows } = await getClient().query(`INSERT INTO "ConnectionHistory" (fk_device,occurred_at) VALUES (${mac},NOW())`);
  }
  catch (err) {
    console.error(`Error inserting new connection history: ${err}`);
  }
}
module.exports = {
  insertData,
  insertNewDevice,
  insertNewHumiditySensor,
  insertConnectionHistory
};
