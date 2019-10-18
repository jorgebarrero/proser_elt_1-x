import * as mariadb from "mariadb";

export const connectDestiny = mariadb.createPool({
  host: "localhost",
  user: `${process.env.REPORTS_DB_USER}`,
  password: `${process.env.REPORTS_DB_PASSWORD}`,
  database: `${process.env.REPORTS_PROSER_DB}`,
  connectionLimit: 10,
  rowsAsArray: false,
  dateStrings: true
});

export const connectOrigin = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "M4pr0t3l",
  database: "node_mysql_ts",
  connectionLimit: 10,
  rowsAsArray: false,
  dateStrings: true
});

export const connect = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "M4pr0t3l",
  database: "node_mysql_ts",
  connectionLimit: 10,
  rowsAsArray: false,
  dateStrings: true
});
