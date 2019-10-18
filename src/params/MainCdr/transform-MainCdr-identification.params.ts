// General parameters

let startDate = "2019-08-28";
let endDate = "2019-08-28";

// CDR
export const transform_MainCdr_identification = {
  queryOrigin: `
      SELECT 
      cdr_id AS id
    , cdr_identification AS cdr_identification
    , JSON_UNQUOTE(JSON_EXTRACT(cdr_data, "$.uniqueid")) as uniqueid
    FROM MainCdr
    WHERE
    CAST(CAST(JSON_UNQUOTE(JSON_EXTRACT(cdr_data, "$.calldate")) AS DATE) AS DATE) BETWEEN CAST('${startDate}' AS DATE) AND CAST('${endDate}' AS DATE)`,

  queryDestiny: ` 
      INSERT INTO MainCdr (cdr_id, cdr_identification) VALUES (?, ?)
      ON DUPLICATE KEY UPDATE 
      cdr_identification=VALUE(cdr_identification)`,

  transformFunction: function(a: any) {
    let identification = JSON.parse(a.cdr_identification);
    identification.uniqueid = a.uniqueid;

    return {
      id: a.id,
      identification: JSON.stringify(identification)
    };
  }
};
