DROP TABLE Users;
DROP TABLE Routes;
DROP TABLE Locations;
DROP TABLE Revenue;
DROP TABLE Expenditure;
DROP TABLE DeliveryTime;
DROP TABLE Mail;


CREATE TABLE Locations(name VARCHAR(50) PRIMARY KEY);
CREATE TABLE Revenue(UID SERIAL,revenue INT);
CREATE TABLE Expenditure(expenditure INT);
CREATE TABLE DeliveryTime(Route SERIAL,time INT);
CREATE TABLE Mail (
	ID SERIAL PRIMARY KEY, 
	creation_date DATE, 
	origin_name VARCHAR(50) REFERENCES Locations(name),
	destination_name VARCHAR(50) REFERENCES Locations(name),
	priority VARCHAR, 
	weight NUMERIC, 
	volume NUMERIC
);

CREATE TABLE Users (Uid SERIAL, Username VARCHAR(50),
RealName VARCHAR(100), Password VARCHAR(50), manager boolean);

CREATE TABLE Routes (
	id SERIAL PRIMARY KEY,
	origin_name VARCHAR(50) REFERENCES Locations(name),
	destination_name VARCHAR(50) REFERENCES Locations(name),
	land BOOLEAN,
	sea BOOLEAN,
	air BOOLEAN
);

INSERT INTO Locations VALUES
('Algeria'), ('Russia'), ('Hungary'), ('Quebec'), ('China');

INSERT INTO Routes VALUES 
(1, 'Algeria', 'Russia', TRUE, FALSE, FALSE), 
(2, 'Russia', 'Algeria', TRUE, FALSE, FALSE);

INSERT INTO Users (Username,Realname,Password,manager) VALUES
('admin','Sally Smith','admin','t');

INSERT INTO Revenue(UID, revenue) VALUES (1, 100);
INSERT INTO Expenditure(expenditure) VALUES (10000);
INSERT INTO DeliveryTime(Route, time) VALUES (1, 3.5);

INSERT INTO Mail VALUES (1, '2012-04-25', 'Algeria', 'Russia', 'Standard', 2.0, 1.5);
