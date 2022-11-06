import database from "./db-connection.js";

async function activites() {
  const sql =
    "CREATE TABLE IF NOT EXISTS activities (id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,title text NOT NULL,email text NOT NULL,created_at datetime NOT NULL, updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,deleted_at datetime DEFAULT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
  await database.query(sql, (error, results) => {});
}

async function todos() {
  const sql2 =
    "CREATE TABLE IF NOT EXISTS todos (id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, title text NOT NULL, is_active smallint(1) NOT NULL DEFAULT '1', priority varchar(24) NOT NULL DEFAULT 'very-high', activity_group_id int(11) NOT NULL, created_at datetime NOT NULL, updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, deleted_at datetime DEFAULT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
  await database.query(sql2, (error, results) => {});
}

async function relation() {
  const sqlRelation =
    "ALTER TABLE todos ADD FOREIGN KEY (activity_group_id) REFERENCES activities(id);";
  await database.query(sqlRelation, (error, results) => {});
}

activites();
todos();
relation();
