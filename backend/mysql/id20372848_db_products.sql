-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 25, 2023 at 02:18 PM
-- Server version: 10.5.16-MariaDB
-- PHP Version: 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id20372848_db_products`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`id20372848_estate`@`%` PROCEDURE `get_products_by_type` (IN `p_product_type` VARCHAR(50))  BEGIN
    SELECT 
        p.*, 
        CASE 
            WHEN p.product_type = 'book' THEN b.weight_kg
            WHEN p.product_type = 'dvd' THEN d.size_mb
            WHEN p.product_type = 'furniture' THEN JSON_OBJECT('width', f.width_cm, 'height', f.height_cm, 'length', f.length_cm)
        END AS attribute
    FROM 
        products p
        LEFT JOIN book b ON p.product_id = b.product_id AND p.product_type = 'book'
        LEFT JOIN dvd d ON p.product_id = d.product_id AND p.product_type = 'dvd'
        LEFT JOIN furniture f ON p.product_id = f.product_id AND p.product_type = 'furniture'
    WHERE 
        p.product_type = p_product_type;
END$$

CREATE DEFINER=`id20372848_estate`@`%` PROCEDURE `process_products` ()  BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE product_type VARCHAR(50);
  DECLARE cur CURSOR FOR SELECT DISTINCT product_type FROM products;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

  OPEN cur;

  read_loop: LOOP
    FETCH cur INTO product_type;

    IF done THEN
      LEAVE read_loop;
    END IF;

    SET @query = CONCAT('CALL get_products_by_type("', product_type, '")');
    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
  END LOOP;

  CLOSE cur;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `book_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `weight_kg` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`book_id`, `product_id`, `weight_kg`) VALUES
(26, 197, 200.00),
(27, 200, 200.00),
(30, 209, 200.00);

-- --------------------------------------------------------

--
-- Table structure for table `dvd`
--

CREATE TABLE `dvd` (
  `dvd_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `size_mb` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dvd`
--

INSERT INTO `dvd` (`dvd_id`, `product_id`, `size_mb`) VALUES
(119, 196, 200),
(120, 199, 200),
(123, 208, 200);

-- --------------------------------------------------------

--
-- Table structure for table `furniture`
--

CREATE TABLE `furniture` (
  `furniture_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `width_cm` int(11) DEFAULT NULL,
  `height_cm` int(11) DEFAULT NULL,
  `length_cm` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `furniture`
--

INSERT INTO `furniture` (`furniture_id`, `product_id`, `width_cm`, `height_cm`, `length_cm`) VALUES
(45, 198, 200, 200, 200),
(46, 201, 200, 200, 200);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `sku` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `product_type` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `sku`, `name`, `price`, `product_type`) VALUES
(196, 'SKUTest000', 'NameTest000', 25.00, 'dvd'),
(197, 'SKUTest001', 'NameTest001', 25.00, 'book'),
(198, 'SKUTest002', 'NameTest002', 25.00, 'furniture'),
(199, 'SKUTest000', 'NameTest000', 25.00, 'dvd'),
(200, 'SKUTest001', 'NameTest001', 25.00, 'book'),
(201, 'SKUTest002', 'NameTest002', 25.00, 'furniture'),
(208, 'SKUTest000', 'NameTest000', 25.00, 'dvd'),
(209, 'SKUTest001', 'NameTest001', 25.00, 'book');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`book_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `dvd`
--
ALTER TABLE `dvd`
  ADD PRIMARY KEY (`dvd_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `furniture`
--
ALTER TABLE `furniture`
  ADD PRIMARY KEY (`furniture_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `dvd`
--
ALTER TABLE `dvd`
  MODIFY `dvd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `furniture`
--
ALTER TABLE `furniture`
  MODIFY `furniture_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=211;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `dvd`
--
ALTER TABLE `dvd`
  ADD CONSTRAINT `dvd_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `furniture`
--
ALTER TABLE `furniture`
  ADD CONSTRAINT `furniture_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
