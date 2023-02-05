const getClient = require("./dbConnection").getClient;

const checkMacExists = async (mac) => {
  try {
    const { rows } = await getClient().query(
      `SELECT * FROM "Device" WHERE "id_mac" = ${mac}`
    );
    return rows.length > 0;
  } catch (err) {
    console.error(`Error checking if MAC ${mac} exists: ${err}`);
  }
};
const getIdFromGardenLine = async (mac, line) => {
  try {
    const { rows } = await getClient().query(`SELECT id FROM "GardenLine" WHERE fk_device = ${mac} AND line_index = ${line}`);
    return rows[0].id;
  }
  catch (err) {
    console.error(`Error getting id from garden line: ${err}`);
    return -1;
  }
};
module.exports = { checkMacExists, getIdFromGardenLine};
