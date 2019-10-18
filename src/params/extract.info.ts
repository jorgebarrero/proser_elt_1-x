// General parameters
let organizationName = "DRC";
let serverName = "LDC";

let startDate = "2019-08-28";
let endDate = "2019-08-28";

// CDR
export const extract_table_cdr = {
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

// AUDIT
export const extract_table_audit = {
  organizationName: organizationName,
  serverName: serverName,
  tableName: "audit",

  queryOrigin: `
    SELECT * FROM call_center.audit
    WHERE 
    CAST(datetime_init AS DATE) BETWEEN CAST('${startDate}' AS DATE) AND CAST('${endDate}' AS DATE);`,

  queryDestiny: ` 
  INSERT INTO MainAudit (audit_id, audit_data, audit_identification) VALUES (?, ?, ?)
  ON DUPLICATE KEY UPDATE 
  audit_data=VALUE(audit_data), 
  audit_identification=VALUE(audit_identification)
  `
};

// MAIN CALL ENTRY
export const extract_table_callentry = {
  organizationName: organizationName,
  serverName: serverName,
  tableName: "call_entry",

  queryOrigin: `
    SELECT * FROM call_center.call_entry
    WHERE 
    CAST(datetime_entry_queue AS DATE) BETWEEN CAST('${startDate}' AS DATE) AND CAST('${endDate}' AS DATE);`,

  queryDestiny: ` 
  INSERT INTO MainCallEntry (callentry_id, callentry_data, callentry_identification) VALUES (?, ?, ?)
  ON DUPLICATE KEY UPDATE 
  callentry_data=VALUE(callentry_data),
  callentry_identification=VALUE(callentry_identification)
  `
};

// MAIN QUEUELOG
export const extract_table_queuelog = {
  organizationName: organizationName,
  serverName: serverName,
  tableName: "queuelog",

  queryOrigin: `
    SELECT * FROM asterisk.queuelog
    WHERE 
    CAST(time AS DATE) BETWEEN CAST('${startDate}' AS DATE) AND CAST('${endDate}' AS DATE);`,

  queryDestiny: ` 
  INSERT INTO MainQueueLog (queuelog_id, queuelog_data, queuelog_identification) VALUES (?, ?, ?)
  ON DUPLICATE KEY UPDATE 
  queuelog_data=VALUE(queuelog_data),
  queuelog_identification=VALUE(queuelog_identification)
  `
};
