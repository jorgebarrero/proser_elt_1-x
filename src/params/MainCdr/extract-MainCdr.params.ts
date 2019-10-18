// CDR

export function extractParamsMainCdr(params: any) {
  let organizationName = params.organizationName;
  let serverName = params.serverName;

  let startDate = params.startDate;
  let endDate = params.endDate;

  return {
    organizationName: organizationName,
    serverName: serverName,
    tableName: "cdr",

    queryOrigin: `
    SELECT * FROM asteriskcdrdb.cdr
    WHERE 
    CAST(calldate AS DATE) BETWEEN CAST('${startDate}' AS DATE) AND CAST('${endDate}' AS DATE);`,

    queryDestiny: ` 
    INSERT INTO MainCdr (cdr_id, cdr_data, cdr_identification) VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE 
    cdr_data=VALUE(cdr_data),
    cdr_identification=VALUE(cdr_identification)
  `
  };
}
