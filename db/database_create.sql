
create database issuetracker;
use issuetracker;

CREATE TABLE issues (
    id INT(8) NOT NULL AUTO_INCREMENT, 
    name VARCHAR(25), 
    type VARCHAR(25),
    parent_id INT(8),
    status VARCHAR(25),
    description VARCHAR(500), 
    created DATETIME NOT NULL, 
    modified DATETIME NOT NULL, 
    primary key (id)
);

CREATE TABLE comments (
    id INT(8) NOT NULL AUTO_INCREMENT, 
    issue_id INT(8),
    created DATETIME NOT NULL, 
    modified DATETIME NOT NULL,
    primary key (id)
);

CREATE TABLE issues_issues (
    a_id INT(8), 
    b_id INT(8)
);

CREATE USER 'issuetracker'@'localhost' IDENTIFIED BY 'issuetracker';
GRANT ALL ON issuetracker.* TO 'issuetracker'@'localhost';