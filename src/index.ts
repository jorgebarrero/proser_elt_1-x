import { App } from "./app";
import "./lib/env";

import { extractRecords } from "./controllers/extract.controller";
import {
  extract_table_audit,
  extract_table_callentry,
  extract_table_queuelog
} from "./params/extract.info";

import { transformRegister } from "./controllers/transform-time.controller";
import { transform_MainCdr_time } from "./params/MainCdr/transform-MainCdr-time.params";
import { transform_MainCdr_identification } from "./params/MainCdr/transform-MainCdr-identification.params";

import { extractParamsMainCdr } from "./params/MainCdr/extract-MainCdr.params";

// General parameters

let generalParams = {
  organizationName: "DRC",
  serverName: "LDC",
  startDate: "2019-08-28",
  endDate: "2019-08-28"
};

let extract_MainCdr_params = extractParamsMainCdr(generalParams);

async function main() {
  await extractRecords(extract_MainCdr_params),
    Promise.all([
      // extractRecords(extract_table_cdr),
      // extractRecords(extract_table_audit),
      // extractRecords(extract_table_callentry),
      // extractRecords(extract_table_queuelog),

      transformRegister(transform_MainCdr_identification)
    ]).then(result => {
      console.log("transformRegister", result);
    });

  // const app = new App(process.env.DEFAULT_PORT_THREE);
  // await app.listen();
}

main();
