CREATE DATABASE SysOpTechTest;
USE SysOpTechTest;

CREATE TABLE T_ROLE(
	pk_role INT NOT NULL AUTO_INCREMENT,
	roleName VARCHAR(20),
    
    PRIMARY KEY(pk_role)
);

CREATE TABLE T_USER(
	pk_idUser 	INT NOT NULL AUTO_INCREMENT,
    fk_role   	INT NOT NULL,
    username	VARCHAR(50) NOT NULL,
    email		VARCHAR(50) UNIQUE NOT NULL,
    password 	VARCHAR(50) NOT NULL,
    phone		VARCHAR(10) NOT NULL,
    birthday	DATE NOT NULL,
	PRIMARY KEY(pk_idUser),
    FOREIGN KEY(fk_role) REFERENCES T_Role(pk_role)
	);