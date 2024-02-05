drop database if exists logindb;

create database logindb;
use logindb;

create table user(
    usr_id int primary key auto_increment not null,
    usr_username VARCHAR(20) not null,
    usr_pass VARCHAR(60) not null
);