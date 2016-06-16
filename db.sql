DROP TABLE Users;
DROP TABLE Routes;
DROP TABLE Locations;

CREATE table Locations(ID SERIAL PRIMARY KEY, name VARCHAR(50));
CREATE table Revenue(UID SERIAL,revenue INT);
CREATE table Expenditure(expenditure INT);
CREATE table DeliveryTime(Route SERIAL,time INT);

CREATE TABLE Users (Uid SERIAL, Username VARCHAR(50),
RealName VARCHAR(100), Password VARCHAR(50), manager boolean);

CREATE table Routes(id SERIAL, addressorigin VARCHAR(50), suburborigin VARCHAR(50), regionorigin VARCHAR(50), countryorigin VARCHAR(50), addressdes VARCHAR(50),suburbdes VARCHAR(50),regiondes VARCHAR(50),countrydes VARCHAR(50),priority VARCHAR(50),land VARCHAR(50),sea VARCHAR(50),air VARCHAR(50));

INSERT INTO Users (Username,Realname,Password,manager) VALUES
('admin','Sally Smith','admin','t');

INSERT INTO Locations VALUES
(1, 'Algeria'), (2, 'Russia'), (3, 'Hungary'), (4, 'Quebec'), (5, 'China');
INSERT INTO Revenue(UID, revenue) VALUES (1, 100);
INSERT INTO Expenditure(expenditure) VALUES (10000);
INSERT INTO DeliveryTime(Route, time) VALUES (1, 3.5);
