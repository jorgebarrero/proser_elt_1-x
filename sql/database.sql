CREATE DATABASE node_mysql_ts;

USE node_mysql_ts;

CREATE TABLE post(
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  imagen_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIME
);


DESCRIBE post;