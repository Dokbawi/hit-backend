/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.7.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: main
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_b8512aa9cef03d90ed5744c94d` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES
(28,'김철수','customer001','$2b$10$MsvVLh4XvP4QUpOaP6fK8OtJpyDYl45nU4MxzGWXWcyjlhjm4RFCG','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000'),
(29,'박영희','customer002','$2b$10$PbLvnTmAelUhm3TC0HhhF.4XW0kOLv52C3/SPp/yKweJNmJcvgmdO','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000'),
(30,'이민수','customer003','$2b$10$w.LU0Mr8WCEhn06eGKkjlOzaVAj8dM18qmFeGgjfG6roJanV32k1m','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `menus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `restaurantId` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int NOT NULL,
  `category` enum('양식','일식','중식') NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_a8bb3519a45e021a147bc87e49` (`name`),
  KEY `IDX_36d69a044fe38765f2c80ebab0` (`price`),
  KEY `IDX_5ce726141e243c5afdfaeffc7f` (`category`),
  KEY `IDX_62f6422b138b02c889426a1bf4` (`restaurantId`),
  CONSTRAINT `FK_62f6422b138b02c889426a1bf47` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` VALUES
(57,19,'짜장면',12000,'중식','매콤한 짜장면','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000',NULL),
(58,19,'짬뽕',10000,'중식','매콤달콤한 짬뽕','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000',NULL),
(59,19,'탕수육',15000,'중식','바삭한 탕수육','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000',NULL),
(60,19,'깐풍기',13000,'중식','달콤한 깐풍기','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000',NULL),
(61,20,'마르게리타 피자',18000,'양식','클래식 마르게리타','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000',NULL),
(62,20,'페퍼로니 피자',20000,'양식','매콤한 페퍼로니','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000',NULL),
(63,20,'까르보나라 파스타',16000,'양식','크림소스 파스타','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000',NULL),
(64,20,'샐러드',8000,'양식','신선한 샐러드','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000',NULL);
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES
(1,1751518580826,'Init1751518580826');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_menus`
--

DROP TABLE IF EXISTS `reservation_menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_menus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `menuId` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ea16967f7ed6509de02f4ecd1e` (`reservationId`,`menuId`),
  KEY `IDX_19e1887a192c73a3bcaf2b5c9e` (`menuId`),
  KEY `IDX_052c1a3d3868f3bbb7d5afa88a` (`reservationId`),
  CONSTRAINT `FK_052c1a3d3868f3bbb7d5afa88aa` FOREIGN KEY (`reservationId`) REFERENCES `reservations` (`id`),
  CONSTRAINT `FK_19e1887a192c73a3bcaf2b5c9e8` FOREIGN KEY (`menuId`) REFERENCES `menus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_menus`
--

LOCK TABLES `reservation_menus` WRITE;
/*!40000 ALTER TABLE `reservation_menus` DISABLE KEYS */;
INSERT INTO `reservation_menus` VALUES
(90,47,57,1,'2025-07-03 15:02:17.000000'),
(91,47,59,1,'2025-07-03 15:02:17.000000'),
(92,48,61,1,'2025-07-03 15:02:17.000000'),
(93,48,64,1,'2025-07-03 15:02:17.000000'),
(94,49,58,2,'2025-07-03 15:02:17.000000'),
(95,49,60,2,'2025-07-03 15:02:17.000000'),
(96,50,62,1,'2025-07-03 15:02:17.000000'),
(97,50,63,1,'2025-07-03 15:02:17.000000'),
(98,51,57,2,'2025-07-03 15:02:17.000000'),
(99,51,59,2,'2025-07-03 15:02:17.000000'),
(100,51,60,1,'2025-07-03 15:02:17.000000'),
(101,52,61,1,'2025-07-03 15:02:17.000000'),
(102,52,63,1,'2025-07-03 15:02:17.000000');
/*!40000 ALTER TABLE `reservation_menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customerId` int NOT NULL,
  `restaurantId` int NOT NULL,
  `date` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `phone` varchar(20) NOT NULL,
  `memberSize` int NOT NULL DEFAULT '1',
  `status` enum('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_d73c945edc0d28ab6d59c400bd` (`restaurantId`,`date`,`startTime`,`endTime`),
  KEY `IDX_1f6a758a1f84714ae9ed1e79a9` (`memberSize`),
  KEY `IDX_a9355fdf6727720771d5e2ff35` (`phone`),
  KEY `IDX_487ec4ed757eed0d34c7ddee79` (`customerId`),
  CONSTRAINT `FK_487ec4ed757eed0d34c7ddee79b` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`),
  CONSTRAINT `FK_f290a56fcecb987c14c68414056` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES
(47,28,19,'2024-12-25','18:00:00','19:00:00','010-1111-1111',2,'confirmed','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000',NULL),
(48,28,20,'2024-12-26','19:00:00','20:00:00','010-1111-1111',3,'confirmed','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000',NULL),
(49,29,19,'2024-12-27','20:00:00','21:00:00','010-2222-2222',4,'confirmed','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000',NULL),
(50,29,20,'2024-12-28','18:30:00','19:30:00','010-2222-2222',2,'confirmed','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000',NULL),
(51,30,19,'2024-12-29','19:30:00','20:30:00','010-3333-3333',5,'confirmed','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000',NULL),
(52,30,20,'2024-12-30','20:30:00','21:30:00','010-3333-3333',2,'confirmed','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000',NULL);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `IDX_a6d82a35be7467761ee3a1a309` (`userId`),
  KEY `IDX_8a604e4f3984d3a2937c1f7879` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES
(19,'restaurant001','$2b$10$W.jOqNeVf7pjX81j1.pnqeUiCCsR2OdILlZy52c9S5u/xKkUVxBfu','맛있는 중식당','02-1234-5678','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000'),
(20,'restaurant002','$2b$10$7sXMh6mgm8bJlsY9.3tfUucawiWQG7A8umViuPqiTm/ZGUPtLxLci','이탈리아 피자하우스','02-8765-4321','2025-07-03 15:02:17.000000','2025-07-03 15:02:17.000000');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'main'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-07-03 15:37:46
