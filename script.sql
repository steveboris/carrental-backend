--
-- Database name: `carrental`
--
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS contactus;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS categories;

-- --------------------------------------------------------
--
-- Table structure for table `brands`
--
CREATE TABLE IF NOT EXISTS `brands` (
   `id` int(11) NOT NULL,
   `name` varchar(120) NOT NULL,
   `dateOfCreation` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `lastUpdate`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `brands` (`id`, `name`, `dateOfCreation`, `lastUpdate`)
VALUES (1, 'MERCEDES', default, default),
       (2, 'BMW', default, default),
       (3, 'Audi', default, default);

-- --------------------------------------------------------
--
-- Table structure for table `localisation`
--
CREATE TABLE IF NOT EXISTS `locations` (
    `id` int(11) NOT NULL,
    `name` varchar(120) DEFAULT NULL,
    `country` varchar(120) DEFAULT NULL,
    `dateOfCreation` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `locations` (`id`, `name`, `country`,`dateOfCreation`) VALUES
(1, 'Berlin', 'Deutschland', default),
(2, 'Brandenburg', 'Deutschland', default),
(3, 'Potsdam', 'Deutschland', default);

-- --------------------------------------------------------
--
-- Table structure for table `categories`
--
CREATE TABLE IF NOT EXISTS `categories` (
    `id` int(11) NOT NULL,
    `name` varchar(120) DEFAULT NULL,
    `dateOfCreation` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `categories` (`id`, `name`,`dateOfCreation`) VALUES
(1, 'Kleinwagen', default),
(2, 'Kompaktklasse', default),
(3, 'Mittelklasse', default),
(4, 'Sportwagen', default);

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--
CREATE TABLE IF NOT EXISTS `cars` (
    `id` int(11) NOT NULL,
    `title` varchar(150) DEFAULT NULL,
    `brandID` int(11) NOT NULL,
    `locationID` int(11) NOT NULL,
    `categoryID` int(11) NOT NULL,
    `color` varchar(20) DEFAULT NULL,
    `details` longtext,
    `pricePerDay` int(11) DEFAULT NULL,
    `fuelType` varchar(20) DEFAULT NULL,
    `modelYear` int(6) DEFAULT NULL,
    `seatingCapacity` int(11) DEFAULT NULL,
    `image1` varchar(120) DEFAULT NULL,
    `image2` varchar(120) DEFAULT NULL,
    `image3` varchar(120) DEFAULT NULL,
    `image4` varchar(120) DEFAULT NULL,
    `registrationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `lastUpdate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `cars` (`id`, `title`, `brandID`, `locationID`,`categoryID`, `color`, `details`, `pricePerDay`, `fuelType`, `modelYear`,
                    `seatingCapacity`, `image1`, `image2`, `image3`, `image4`,`registrationDate`, `LastUpdate`)
VALUES (1, 'ML 240', 1, 1, 1, 'Schwarz', 'Mercedes ML 240 ll', 45, 'Benzin', 2020, 7, NULL, NULL, NULL, NULL, default, default),
       (2, 'X7', 2, 2, 1, 'Blau', 'BMW X7', 45, 'Benzin', 2020, 7, NULL, NULL, NULL, NULL, default, default),
       (3, 'A8', 1, 3,1,'Silber', 'Audi A8', 35, 'Benzin', 2020, 7, NULL, NULL, NULL, NULL, default, default);
-- --------------------------------------------------------

--
-- Table structure for table `users`
--
CREATE TABLE IF NOT EXISTS `users` (
    `id` int(11) NOT NULL,
    `firstname` varchar(50) DEFAULT NULL,
    `lastname` varchar(50) DEFAULT NULL,
    `email` varchar(100) DEFAULT NULL,
    `username` varchar(100) DEFAULT NULL,
    `password` varchar(100) DEFAULT NULL,
    `phone` char(11) DEFAULT NULL,
    `address` varchar(255) DEFAULT NULL,
    `city` varchar(100) DEFAULT NULL,
    `country` varchar(100) DEFAULT NULL,
    `type` varchar(50) NOT NULL,
    `registrationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `lastUpdate` TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `phone`, `address`, `city`, `country`, `type`,
--                     `registrationDate`, `lastUpdate`)
-- VALUES (1, 'Danielle', 'danielle@local.com', '21232f297a57a5a743894a0e4a801fc3', 015276899452, '15/02/2020',
--        'Brandenburgerstr. 1', 'Berlin', 'Deutschland', 'admin', default, default),
--       (2, 'Marie', 'marie@local.com', '21232f297a57a5a743894a0e4a801fc3', 015171895552, '15/02/2020',
--        'Bergerstr. 1', 'Brandenburg', 'Deutschland', 'admin', default, default);
-- --------------------------------------------------------
--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
    `id` int(11) NOT NULL,
    `userID` int(11) NOT NULL,
    `carID` int(11) NOT NULL,
    `fromDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `toDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `details` varchar(255) DEFAULT NULL,
    `status` int(11) DEFAULT NULL,
    `postingDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- INSERT INTO `orders` (`id`, `userID`, `carID`, `fromDate`, `toDate`, `details`, `status`, `postingDate`)
-- VALUES (1, 'user@test.com', 1, '2020-02-14 09:34:04', '2020-02-20 09:34:04', 'Danke für die Punktlichkeit', 1, default);
-- --------------------------------------------------------
--
-- Table structure for table `contactus`
--

CREATE TABLE IF NOT EXISTS `contactus` (
   `id` int(11) NOT NULL,
   `name` varchar(100) DEFAULT NULL,
   `userID` int(11) NOT NULL,
   `phone` char(11) DEFAULT NULL,
   `details` longtext,
   `postingDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `status` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- INSERT INTO `contactus` (`id`, `Name`, `userID`, `phone`, `details`, `postingDate`, `status`)
-- VALUES (1, 'Titus', 'tituslepro@test.com', 015623178952, 'I would like to have more information about the rental process', default, 1);

-- --------------------------------------------------------
--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
    ADD PRIMARY KEY (`id`);
    
--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
    ADD PRIMARY KEY (`id`);
--
-- Indexes for table `localisation`
--
ALTER TABLE `locations`
    ADD PRIMARY KEY (`id`);
--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
    ADD PRIMARY KEY (`id`);

--
-- Tables settings
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `contactus`
--
ALTER TABLE `contactus`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;

--
-- FOREIGN KEY for table `orders`
--
ALTER TABLE `orders`
    ADD CONSTRAINT FK_UserOrder
    FOREIGN KEY (userID) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE `orders`
    ADD CONSTRAINT FK_CarsOrder
    FOREIGN KEY (carID) REFERENCES cars(id) ON UPDATE CASCADE ON DELETE CASCADE;

--
-- FOREIGN KEY for table `contactus`
--
ALTER TABLE `contactus`
    ADD CONSTRAINT FK_UserContactus
    FOREIGN KEY (userID) REFERENCES users(id);

--
-- FOREIGN KEY for table `cars`
--
ALTER TABLE `cars`
    ADD CONSTRAINT FK_BrandCar
    FOREIGN KEY (brandID) REFERENCES brands(id);

ALTER TABLE `cars`
    ADD CONSTRAINT FK_LocationCar
    FOREIGN KEY (locationID) REFERENCES locations(id);

ALTER TABLE `cars`
    ADD CONSTRAINT FK_CategoriesCar
    FOREIGN KEY (categoryID) REFERENCES categories(id);

-- --------------------------------------------------------------------