-- schema definition

#########################
#
# DDL Section
#
#########################

#  OfferingType

DROP TABLE IF EXISTS OfferingType;

CREATE TABLE IF NOT EXISTS OfferingType (
  id          INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name        VARCHAR(255) COMMENT 'starbucks refreshers beverages',
  description VARCHAR(255) COMMENT 'longer days mean more time to sip something warm'

);

# Offering

DROP TABLE IF EXISTS Offering;

CREATE TABLE Offering (
  id             INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name           VARCHAR(255) COMMENT 'cool lime starbucks refreshers beverage',
  description    VARCHAR(255),
  offeringTypeId INT             NOT NULL
);

ALTER TABLE Offering
  ADD FOREIGN KEY (offeringTypeId) REFERENCES OfferingType (id);

# Tag

DROP TABLE IF EXISTS Tag;

CREATE TABLE IF NOT EXISTS Tag (
  id   INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) COMMENT 'name can be based on tags'

);

# Location

DROP TABLE IF EXISTS Location;

CREATE TABLE IF NOT EXISTS Location (
  id      INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name    VARCHAR(255) COMMENT 'name of places',
  address VARCHAR(1024),
  phone   VARCHAR(255)

);

# Ingredient

DROP TABLE IF EXISTS Ingredient;

CREATE TABLE IF NOT EXISTS Ingredient (
  id   INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) COMMENT 'lime refresher base'
);

DROP TABLE IF EXISTS OfferingTag;

# Offering <--> Tag

CREATE TABLE IF NOT EXISTS OfferingTag (
  offeringId INT NOT NULL,
  tagId      INT NOT NULL
);

ALTER TABLE OfferingTag
  ADD FOREIGN KEY (offeringId) REFERENCES Offering (id);
ALTER TABLE OfferingTag
  ADD FOREIGN KEY (tagId) REFERENCES Tag (id);

# Location <--> Offering

DROP TABLE IF EXISTS LocationOffering;

CREATE TABLE IF NOT EXISTS LocationOffering (
  locationId      INT NOT NULL,
  offeringPriceId INT NOT NULL
);

ALTER TABLE LocationOffering
  ADD FOREIGN KEY (locationId) REFERENCES Location (id);

# Offering <--> Ingredient

DROP TABLE IF EXISTS OfferingIngredient;

CREATE TABLE IF NOT EXISTS OfferingIngredient (
  offeringId   INT NOT NULL,
  ingredientId INT NOT NULL
);

ALTER TABLE OfferingIngredient
  ADD FOREIGN KEY (offeringId) REFERENCES Offering (id);
ALTER TABLE OfferingIngredient
  ADD FOREIGN KEY (ingredientId) REFERENCES Ingredient (id);

# OfferingSize

DROP TABLE IF EXISTS OfferingSize;

CREATE TABLE IF NOT EXISTS OfferingSize (
  id   INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255),
  oz   INT
);

# OfferingPrice

DROP TABLE IF EXISTS OfferingPrice;

CREATE TABLE IF NOT EXISTS OfferingPrice (
  id             INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  offeringId     INT,
  offeringSizeId INT,
  price          FLOAT
);

ALTER TABLE OfferingPrice
  ADD FOREIGN KEY (offeringId) REFERENCES Offering (id);
ALTER TABLE OfferingPrice
  ADD FOREIGN KEY (offeringSizeId) REFERENCES OfferingSize (id);
ALTER TABLE LocationOffering
  ADD FOREIGN KEY (offeringPriceId) REFERENCES OfferingPrice (id);

#########################
#
# DML Section
#
#########################

# OfferingType

INSERT INTO OfferingType (id, name, description) VALUES
  (1, 'Fresh Brews', 'Freshly brewed beverages for your start-of-day pleasure'),
  (2, 'Cold Brews', 'Brews kept cold for those specially hot moments'),
  (3, 'New fizzio', 'Handcrafted sodas made just for you'),
  (4, 'Espresso Drinks', 'The pleasure of our brews compressed into the tiniest size'),
  (5, 'Frappuccino Blends', 'Cold as cold gets.');

# Offering

INSERT INTO Offering (id, name, description, offeringTypeId) VALUES
  (1, 'Regular Coffee', 'Our best blend', 1),
  (2, 'Cappuccino', 'Creamy and delicious', 1),
  (3, 'Iced Tea', 'Best tea in the world, iced.', 2),
  (4, 'Iced Coffee', 'Our regular brewed coffee, iced.', 2),
  (5, 'Lemon Ale Fizzio', 'real lemon juice with a hint of apricot and ginger', 3),
  (6, 'Ginger Ale', 'not your average ginger ale', 3),
  (7, 'Caffe Americano', 'Watered down espresso mixed with milk', 4),
  (8, 'Caffe Latte', 'Large espresso mixed with milk', 4),
  (9, 'Caramel Frappuccino', 'Regular coffee iced and mixed with salted caramel', 5),
  (10, 'Almond Frappuccino', 'Regular coffee iced and mixed with almond flakes', 5);

# OfferingSize

INSERT INTO OfferingSize (id, name, oz) VALUES
  (1, 'small', 8),
  (2, 'medium', 12),
  (3, 'tall', 16);

# OfferingPrice

INSERT INTO OfferingPrice (id, offeringId, offeringSizeId, price) VALUES
  (1, 1, 1, 3.2),
  (2, 1, 2, 5.5),
  (3, 1, 3, 7.3),
  (4, 2, 1, 3.4),
  (5, 2, 2, 5.3),
  (6, 2, 3, 8.5),
  (7, 3, 1, 3.6),
  (8, 3, 2, 5.3),
  (9, 3, 3, 8.4),
  (10, 4, 1, 3.3),
  (11, 4, 2, 5.7),
  (12, 4, 3, 7.6),
  (13, 5, 1, 3.2),
  (14, 5, 2, 5.2),
  (15, 5, 3, 7.7),
  (16, 6, 1, 3.3),
  (17, 6, 2, 5.6),
  (18, 6, 3, 8.9),
  (19, 7, 1, 3.4),
  (20, 7, 2, 5.4),
  (21, 7, 3, 7.7),
  (22, 8, 1, 3.3),
  (23, 8, 2, 5.5),
  (24, 8, 3, 8.6),
  (25, 9, 1, 3.5),
  (26, 9, 2, 5.3),
  (27, 9, 3, 6.9),
  (28, 10, 1, 3.4),
  (29, 10, 2, 5.2),
  (30, 10, 3, 8.6);

# Location

INSERT INTO Location (id, name, address, phone) VALUES
  (1, 'Lynnwood Starbucks', '19220 Alderwood Mall Pkwy Lynnwood WA', '4257747728'),
  (2, 'Seattle Starbucks', '102 Pike St Seattle WA', '2069038010'),
  (3, 'Edmonds Starbucks', 'Aurora Marketplace 23632 WA Hw 99 Edmonds WA', '4257781411'),
  (4, 'Kirkland Starbucks', '6617 132nd Ave NE Kirkland WA', '4258818265'),
  (5, 'Tacoma Starbucks', '1723 S 72nd St Tacoma WA', '2536718337'),
  (6, 'Bellevue Starbucks', '500 108th Ave NE 1A1 Bellevue WA', '4256376513'),
  (7, 'Shorline', '1251 N 205th St Shoreline WA', '2065429608'),
  (8, 'tacoma', '2505 S 38th St Tacoma WA', '2534755644'),
  (9, 'Seattle', '4634 26th Ave NE Seattle WA', '2065225228'),
  (10, 'Bothel', '2020 Maltby Rd Bothel WA', '4254851255');

# OfferingLocation

INSERT INTO LocationOffering (locationId, offeringPriceId) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (1, 7),
  (1, 8),
  (1, 9),
  (1, 10),
  (1, 11),
  (1, 13),
  (1, 14),
  (1, 15),
  (1, 16),
  (1, 17),
  (1, 18),
  (1, 19),
  (1, 20),
  (1, 23),
  (1, 24),
  (1, 25),
  (1, 26),
  (1, 30),

  (2, 1),
  (2, 2),
  (2, 3),
  (2, 5),
  (2, 6),
  (2, 7),
  (2, 8),
  (2, 9),
  (2, 11),
  (2, 12),
  (2, 13),
  (2, 14),
  (2, 15),
  (2, 19),
  (2, 20),
  (2, 21),
  (2, 22),
  (2, 23),
  (2, 25),
  (2, 26),
  (2, 28),
  (2, 29),

  (3, 1),
  (3, 4),
  (3, 5),
  (3, 6),
  (3, 7),
  (3, 9),
  (3, 10),
  (3, 16),
  (3, 17),
  (3, 18),
  (3, 19),
  (3, 20),
  (3, 21),
  (3, 22),
  (3, 23),
  (3, 25),
  (3, 26),
  (3, 29),
  (3, 30),

  (4, 1),
  (4, 2),
  (4, 7),
  (4, 8),
  (4, 9),
  (4, 10),
  (4, 11),
  (4, 12),
  (4, 13),
  (4, 14),
  (4, 15),
  (4, 16),
  (4, 17),
  (4, 18),
  (4, 19),
  (4, 20),
  (4, 21),
  (4, 22),
  (4, 26),
  (4, 27),
  (4, 28),
  (4, 29),

  (5, 4),
  (5, 5),
  (5, 6),
  (5, 7),
  (5, 8),
  (5, 9),
  (5, 10),
  (5, 11),
  (5, 12),
  (5, 13),
  (5, 14),
  (5, 15),
  (5, 16),
  (5, 17),
  (5, 18),
  (5, 19),
  (5, 20),
  (5, 21),
  (5, 22),
  (5, 23),
  (5, 24),
  (5, 25),
  (5, 26),
  (5, 27),
  (5, 29),
  (5, 30),

  (6, 1),
  (6, 2),
  (6, 3),
  (6, 4),
  (6, 5),
  (6, 6),
  (6, 7),
  (6, 8),
  (6, 9),
  (6, 10),
  (6, 11),
  (6, 12),
  (6, 16),
  (6, 17),
  (6, 18),
  (6, 19),
  (6, 20),
  (6, 26),
  (6, 27),
  (6, 28),
  (6, 29),
  (6, 30),

  (7, 1),
  (7, 2),
  (7, 3),
  (7, 4),
  (7, 5),
  (7, 6),
  (7, 7),
  (7, 8),
  (7, 9),
  (7, 10),
  (7, 11),
  (7, 12),
  (7, 13),
  (7, 14),
  (7, 15),
  (7, 16),
  (7, 23),
  (7, 24),
  (7, 25),
  (7, 26),

  (8, 1),
  (8, 2),
  (8, 3),
  (8, 4),
  (8, 5),
  (8, 6),
  (8, 13),
  (8, 14),
  (8, 15),
  (8, 16),
  (8, 17),
  (8, 18),
  (8, 19),
  (8, 20),
  (8, 21),
  (8, 22),
  (8, 23),
  (8, 24),
  (8, 25),
  (8, 26),
  (8, 27),
  (8, 30),

  (9, 1),
  (9, 2),
  (9, 3),
  (9, 4),
  (9, 5),
  (9, 6),
  (9, 7),
  (9, 8),
  (9, 9),
  (9, 10),
  (9, 11),
  (9, 12),
  (9, 13),
  (9, 14),
  (9, 15),
  (9, 16),
  (9, 17),
  (9, 18),
  (9, 19),
  (9, 20),
  (9, 21),
  (9, 22),
  (9, 23),
  (9, 24),
  (9, 25),
  (9, 26),
  (9, 27),
  (9, 28),
  (9, 29),
  (9, 30),

  (10, 1),
  (10, 3),
  (10, 4),
  (10, 6),
  (10, 7),
  (10, 8),
  (10, 11),
  (10, 12),
  (10, 13),
  (10, 14),
  (10, 15),
  (10, 16),
  (10, 18),
  (10, 19),
  (10, 20),
  (10, 22),
  (10, 23),
  (10, 24),
  (10, 26),
  (10, 27),
  (10, 28),
  (10, 29),
  (10, 30);

# Tag

INSERT INTO Tag (id, name) VALUES
  (1, 'hot'),
  (2, 'cold'),
  (3, 'iced'),
  (4, 'regular'),
  (5, 'latte'),
  (6, 'coffee'),
  (7, 'tea'),
  (8, 'classic'),
  (9, 'Fizzio'),
  (10, 'mixed'),
  (11, 'frappuccino'),
  (12, 'flakes'),
  (13, 'best'),
  (14, 'creamy'),
  (15, 'delicious'),
  (16, 'brewed'),
  (17, 'blend'),
  (18, 'energy'),
  (19, 'espresso'),
  (21, 'cappuccino'),
  (22, 'lemon Ale'),
  (23, 'fizzio'),
  (24, 'real lemon'),
  (25, 'juice'),
  (26, 'ginger'),
  (27, 'ginger Ale'),
  (20, 'flowery');

# OfferingTag

INSERT INTO OfferingTag (offeringId, tagId) VALUES
  (1, 1),
  (1, 4),
  (1, 17),
  (2, 1),
  (2, 14),
  (2, 21),
  (3, 2),
  (3, 3),
  (3, 7),
  (3, 13),
  (4, 2),
  (4, 3),
  (4, 16),
  (4, 4),
  (4, 6),
  (5, 2),
  (5, 3),
  (5, 26),
  (5, 25),
  (5, 24),
  (5, 23),
  (5, 22),
  (6, 2),
  (6, 3),
  (6, 26),
  (6, 23),
  (6, 25),
  (6, 27),
  (7, 1),
  (7, 10),
  (7, 19),
  (8, 1),
  (8, 10),
  (9,2),
  (9,3),
  (9,6),
  (9,4),
  (9,10),
  (10,4),
  (10,6),
  (10,3),
  (10,2),
  (10,12);


# Ingredient

INSERT INTO Ingredient (id, name) VALUES

  (1, 'brewed Coffee'),
  (2, 'Milk'),
  (3, 'Brewed Espresso'),
  (4, 'water'),
  (5, 'black tea'),
  (6, 'bergamont essence'),
  (7, 'lavender flowers'),
  (8, 'ice'),
  (9, 'classic syrup'),
  (10, 'coffee frappuccino syrup'),
  (11, 'coffee'),
  (12, 'whipped cream'),
  (13, 'caramel syrup'),
  (14, 'caramel drizzle'),
  (15, 'almondmilk'),
  (16, 'coffee frappucino syrup'),
  (17, 'cinnamon dolce syrup'),
  (18, 'cinnamon dolce topping'),
  (19, 'caramel sauce'),
  (20, 'lemon ale Fizzio base'),
  (21, 'ginger ale Fizzio base');

# OfferingIngredient

INSERT INTO OfferingIngredient (offeringId, ingredientId) VALUES

  (10, 8),
  (10, 15),
  (10, 16),
  (10, 12),
  (10, 11),
  (10, 17),
  (10, 19),
  (10, 18),
  (9, 8),
  (9, 2),
  (9, 10),
  (9, 11),
  (9, 12),
  (9, 13),
  (9, 14),
  (8, 2),
  (8, 3),
  (7, 3),
  (7, 4),
  (5, 8),
  (5, 20),
  (5, 4),
  (6, 21),
  (6, 8),
  (6, 4),
  (1, 1),
  (2, 2),
  (2, 3),
  (3, 4),
  (3, 5),
  (3, 6),
  (3, 7),
  (4, 1),
  (4, 8),
  (4, 9);






