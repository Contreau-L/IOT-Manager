const getClient = require("./dbConnection").getClient;

const checkMacExists = async (mac) => {
  try {
    const { rows } = await getClient().query(
      `SELECT * FROM "Device" WHERE "id_mac" = ${mac}`
    );
    if (rows.length > 0) {
      console.log(`Device with MAC ${mac} already exists`);
      return true;
    } else {
      console.log(`Device with MAC ${mac} does not exist, inserting into DB`);
      return false;
    }
  } catch (err) {
    console.error(`Error checking if MAC ${mac} exists: ${err}`);
  }
};

module.exports = { checkMacExists };
