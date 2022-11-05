CREATE DATABASE IF NOT EXISTS todo4;

USE todo4;

DROP TABLE IF EXISTS todo_list;
DROP TABLE IF EXISTS activity;

CREATE TABLE activity (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title text NOT NULL,
  email text NOT NULL,
  created_at datetime NOT NULL,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE todo_list (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title text NOT NULL,
  is_active smallint(1) NOT NULL DEFAULT '1',
  priority varchar(24) NOT NULL DEFAULT 'very-high',
  activity_group_id int(11) NOT NULL,
  created_at datetime NOT NULL,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at datetime DEFAULT NULL,
  FOREIGN KEY (activity_group_id) REFERENCES activity(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;