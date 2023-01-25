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

module.exports = { checkMacExists };
