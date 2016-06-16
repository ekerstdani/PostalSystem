DROP TABLE Users;
DROP TABLE Routes;
DROP TABLE Locations;

CREATE TABLE Locations(ID SERIAL PRIMARY KEY, name VARCHAR(50));
CREATE TABLE Revenue(UID SERIAL,revenue INT);
CREATE TABLE Expenditure(expenditure INT);
CREATE TABLE DeliveryTime(Route SERIAL,time INT);
CREATE TABLE Mail(ID SERIAL PRIMARY KEY, creation_date DATE, origin_id SERIAL, destination_id SERIAL,
priority VARCHAR, weight NUMERIC, volume NUMERIC);

CREATE TABLE Users (Uid SERIAL, Username VARCHAR(50),
RealName VARCHAR(100), Password VARCHAR(50), manager boolean);

CREATE TABLE Routes(id SERIAL, addressorigin VARCHAR(50), suburborigin VARCHAR(50), regionorigin VARCHAR(50), countryorigin VARCHAR(50), addressdes VARCHAR(50),suburbdes VARCHAR(50),regiondes VARCHAR(50),countrydes VARCHAR(50),priority VARCHAR(50),land VARCHAR(50),sea VARCHAR(50),air VARCHAR(50));

INSERT INTO Users (Username,Realname,Password,manager) VALUES
('admin','Sally Smith','admin','t');

INSERT INTO Locations VALUES
(1, 'Algeria'), (2, 'Russia'), (3, 'Hungary'), (4, 'Quebec'), (5, 'China');
INSERT INTO Revenue(UID, revenue) VALUES (1, 100);
INSERT INTO Expenditure(expenditure) VALUES (10000);
INSERT INTO DeliveryTime(Route, time) VALUES (1, 3.5);

INSERT INTO Mail VALUES (1, '2012-04-25', 1, 2, 'Standard', 2.0, 1.5);
