// General parameters

let startDate = "2019-09-20";
let endDate = "2019-09-20";

// CDR
export const transform_MainCdr_time = {
  queryOrigin: `

    WHERE
    CAST(CAST(JSON_UNQUOTE(JSON_EXTRACT(cdr_data, "$.calldate")) AS DATE) AS DATE) BETWEEN CAST('${startDate}' AS DATE) AND CAST('${endDate}' AS DATE)`,

  queryDestiny: ` 
      INSERT INTO MainCdr (cdr_id, cdr_time) VALUES (?, ?)
      ON DUPLICATE KEY UPDATE 
      cdr_time=VALUE(cdr_time)`,

  transformFunction: function(a: any) {
    return {
      id: a.id,

      time: JSON.stringify({
        start_date: a.start_date,
        duration: a.duration,
        billsec: a.billsec
      })
    };
  }
};
