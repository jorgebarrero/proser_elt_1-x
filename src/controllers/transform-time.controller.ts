import { connectDestiny, connectOrigin } from "../connectors/mariadb";
const moment = require("moment");

import "../lib/env";
import errorReporter from "../lib/errors";

let startDate = "2019-08-28";
let endDate = "2019-08-28";

export async function transformRegister(val: any) {
  // Create connections with origin and destiny database
  const origin = await connectDestiny.getConnection();
  const destiny = await connectDestiny.getConnection();

  // check query
  console.log("******************************************");
  console.log("val.queryOrigin", val.queryOrigin);
  console.log("******************************************");
  console.log("");
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
        return val.transformFunction(a);
      });

      // Detect names of fields
      let myRecords = extendedOrigin.map((x: any) => {
        return Object.values(x);
      });

      // Save data into Destiny
      let resultDestiny = await destiny.batch(val.queryDestiny, myRecords);

      // Report result
      message = resultDestiny;
      // message = resultDestiny ? resultDestiny : message;
    }
    // Show result

    return message;
  } catch (error) {
    console.log("error", error);
  }
}
