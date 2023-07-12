create database if not exists companydb

use companydb

create table employee(
	id int not null auto_increment,
    name varchar(45) default null,
    salary int default null,
    primary key(id)
);

show tables
describe employee