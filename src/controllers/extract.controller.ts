import { connectDestiny, connectOrigin } from "../connectors/mariadb";
const moment = require("moment");

// const mariadb = require("mariadb");

// import "../lib/env";
// import errorReporter from "../lib/errors";

export async function extractRecords(val: any) {
  // Create connections with origin and destiny database
  const origin = await connectOrigin.getConnection();
  const destiny = await connectDestiny.getConnection();

  try {
    // Set message
    let message: any = { affectedRows: 0, insertId: 0, warningStatus: 0 };

    // Read data from Origin
    let resultOrigin = await origin.query(val.queryOrigin);

    // Clean data row packets
    let resultData = JSON.parse(JSON.stringify(resultOrigin));

    // Only write if data exists
    if (Array.isArray(resultData) && resultData.length > 0) {
      // Convert data into id and data fields
      let extendedOrigin = resultData.map((a: any) => {
        return {
          id: `${val.organizationName}-${val.serverName}-${val.tableName}-${a.id}`,
          data: JSON.stringify(a),
          identification: JSON.stringify({
            organizationName: val.organizationName,
            serverName: val.serverName,
            tableName: val.tableName,
            recordNumber: a.id,
            lastUpdate: moment().format("YYYY-MM-DD hh:mm:ss")
          })
        };
      });

      // Detect names of fields
      let myRecords = extendedOrigin.map((x: any) => {
        return Object.values(x);
      });

      // Save data into Destiny
      let resultDestiny = await destiny.batch(val.queryDestiny, myRecords);

      // Report result
      message = resultDestiny;
    }
    // Show result
    // console.log(message);
    return message;
  } catch (error) {
    console.log("error", error);
  }
}
