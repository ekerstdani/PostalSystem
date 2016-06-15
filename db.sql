CREATE TABLE Users (Uid SERIAL, Username VARCHAR(50),
RealName VARCHAR(100), Password VARCHAR(50), manager character varying(100));

CREATE table Routes(addressorigin VARCHAR(50), suburborigin VARCHAR(50), regionorigin VARCHAR(50), countryorigin VARCHAR(50), addressdes VARCHAR(50),suburbdes VARCHAR(50),regiondes VARCHAR(50),countrydes VARCHAR(50),priority VARCHAR(50),land VARCHAR(50),sea VARCHAR(50),air VARCHAR(50));




INSERT INTO Users (Username,Realname,Password,manager) VALUES
('admin','Sally Smith','admin','t');



