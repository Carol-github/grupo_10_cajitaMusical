-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: cajitamusical_db
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_pivot`
--

DROP TABLE IF EXISTS `cart_pivot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_pivot` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fk_product` int NOT NULL,
  `fk_cart` int NOT NULL,
  `quantity` int NOT NULL,
  `prod_price` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_pibot_FK` (`fk_product`),
  KEY `cart_pibot_FK_1` (`fk_cart`),
  CONSTRAINT `cart_pibot_FK` FOREIGN KEY (`fk_product`) REFERENCES `products` (`id`),
  CONSTRAINT `cart_pibot_FK_1` FOREIGN KEY (`fk_cart`) REFERENCES `user_cart` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_pivot`
--

LOCK TABLES `cart_pivot` WRITE;
/*!40000 ALTER TABLE `cart_pivot` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_pivot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_categories`
--

DROP TABLE IF EXISTS `product_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_categories`
--

LOCK TABLES `product_categories` WRITE;
/*!40000 ALTER TABLE `product_categories` DISABLE KEYS */;
INSERT INTO `product_categories` VALUES (1,'Cuerdas','CUERDAS','cat_guitar_color.jpg','icon_cuerdas.svg',0),(2,'Vientos','VIENTOS','cat_winds_color.png','icon_vientos.svg',0),(3,'Teclas','TECLAS','cat_keyboards_color.png','icon_teclas.svg',0),(4,'Percusión','PERCUSIÓN','cat_drums_color.png','icon_percusion.svg',0);
/*!40000 ALTER TABLE `product_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_subcategories`
--

DROP TABLE IF EXISTS `product_subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_subcategories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subcategory_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fk_category` int NOT NULL,
  `deleted` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_subcategories_FK` (`fk_category`),
  CONSTRAINT `product_subcategories_FK` FOREIGN KEY (`fk_category`) REFERENCES `product_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_subcategories`
--

LOCK TABLES `product_subcategories` WRITE;
/*!40000 ALTER TABLE `product_subcategories` DISABLE KEYS */;
INSERT INTO `product_subcategories` VALUES (1,'Guitarra Eléctrica',1,0),(2,'Guitarra Criolla',1,0),(3,'Guitarra Acústica',1,0),(4,'Bajo',1,0),(5,'Batería Acústica',4,0),(6,'Batería Eléctrica',4,0),(7,'Pandereta',4,0),(8,'Armónica',2,0),(9,'Saxofón',2,0),(10,'Piano',3,0),(11,'Piano Eléctrico',3,0),(12,'Trombón',2,0),(13,'Flauta',2,0),(14,'Trompeta',2,0);
/*!40000 ALTER TABLE `product_subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `offer` tinyint NOT NULL,
  `price` int NOT NULL,
  `fk_category` int DEFAULT NULL,
  `fk_subcategory` int DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_FK_subcat` (`fk_subcategory`),
  KEY `products_FK` (`fk_category`),
  CONSTRAINT `products_FK` FOREIGN KEY (`fk_subcategory`) REFERENCES `product_subcategories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (24,'Epiphone Allen Woody Rumblekat ',0,520000,1,4,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638022733224_.jpg',0),(25,'Epiphone Jack Casady Bass   ',0,600000,1,4,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638022804110_.jpg',0),(26,'Fender Jazz Bass 60´s Classic  ',1,300000,1,4,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638022840010_.jpg',0),(27,'Epiphone Thund PRO-IV',1,600000,1,4,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638022877900_.jpg',0),(28,'Fender Jazz Bass 60´s ',0,83000,1,4,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638022952866_.jpg',0),(29,'Epiphone Sheraton-II Pro ',0,150000,1,1,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638023005511_.jpg',0),(30,'Epiphone Wildkat White Royale',0,190000,1,1,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638023255640_.jpg',0),(31,'Gibson Explorer T 2017 HC',0,210000,1,1,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638023817222_.jpg',0),(32,'Gibson LP Classic GT',0,235000,1,1,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638023905945_.jpg',0),(33,'Memphis White Telecaster',0,185000,1,1,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638024407401_.jpg',0),(34,'Parquer 5 cuerpos',1,290000,4,5,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638024455525_.jpg',0),(35,'Legend Traveler 4 Cuerpos con fierros',0,310000,4,5,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638024798251_.jpg',0),(36,'Grestch Renegade 5 Cuerpos',0,350000,4,5,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638024836974_.jpg',0),(37,'Gretsch Catalina Club 4 Cuerpos',0,335000,4,5,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638024881036_.jpg',0),(38,'Grestch Catalina Club 4 Cuerpos Black ',1,339000,4,5,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638025079315_.jpg',0),(39,'Alesis Strike Kit',0,289000,4,5,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638025144020_.jpg',0),(40,'Carlsbro Club100  ',1,265000,4,6,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638061739559_.jpg',0),(41,'Electronica Nord Drum 3P ',1,115000,4,6,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638025411593_.jpg',0),(42,'Carlsbro Rock 50 (para niños)',0,132000,1,1,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638025456008_.jpg',0),(43,'Behringer Xd8usb',0,215000,4,6,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638025738162_.jpg',0),(44,'Kawai GL10 ',1,630000,3,10,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638025796769_.jpg',0),(45,'Casio CTX 5000',0,95000,3,11,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638026000795_.jpg',0),(46,'Korg Liverpool Micro (61 teclas)',0,92000,1,1,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638026043930_.jpg',0),(47,'Alesis Vortex Wireless',1,39900,3,11,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638026113927_.jpg',0),(48,'Novation 49sl Mkl ',0,135500,3,11,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638026190350_.jpg',0),(49,'Hohner BluesHarp ',0,8900,2,8,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638026319504_.jpg',0),(50,'Stagg (trombon a pistones)',1,86000,2,12,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638026641813_.jpg',0),(51,'Roy Benson TS-202 (Alto)',0,109000,2,9,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638026764412_.jpg',0),(52,'Yamaha YFL 212 (Trav. Cerrada)',0,135000,2,13,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638026872019_.jpg',0),(53,'Parquer Pocket',0,56700,2,14,'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.','imgProduct_1638026964749_.jpg',0),(55,'PRUEBAA',1,600000,4,14,'Este es el durazno jugoso de prueba','imgProduct_1638068880478_.png',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_cart`
--

DROP TABLE IF EXISTS `user_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fk_user` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_cart_FK` (`fk_user`),
  CONSTRAINT `user_cart_FK` FOREIGN KEY (`fk_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_cart`
--

LOCK TABLES `user_cart` WRITE;
/*!40000 ALTER TABLE `user_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_categories`
--

DROP TABLE IF EXISTS `user_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_categories`
--

LOCK TABLES `user_categories` WRITE;
/*!40000 ALTER TABLE `user_categories` DISABLE KEYS */;
INSERT INTO `user_categories` VALUES (1,'admin'),(2,'customer');
/*!40000 ALTER TABLE `user_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int NOT NULL,
  `image` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_FK` (`category_id`),
  CONSTRAINT `users_FK` FOREIGN KEY (`category_id`) REFERENCES `user_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (12,'pikachu77','Juan','Pikaika','pikachu@cajitamusical.com','$2a$10$PG.22Y5z0Y744FQHHaQG.OnuXEC/MigYqbhe7C6IXxH3xcEzCm92.',1,'avatar_1638038861567_.png',0),(13,'charmander88','Jazmin','Fire','charmander@gmail.com','$2a$10$LoXIiYXA20ZAr98XHygxDuv9YaakY7pywqQTIy2ME/W5AR.dEF906',2,'avatar_1638038939521_.png',0),(14,'magikarp89','Mariel','Karp','pezmortal@gmail.com','$2a$10$qQlkG7SnW3ugEBNQsJ9x7uWRk0XQ5zlvIzNnj2VKUsAgqcFV1jcFm',2,'avatar_1638039215385_.jpg',0),(15,'squirtle666','John','Squire','maremoto@gmail.com','$2a$10$D4gcUhdFbF5q9Ico1dKlsOjiPFXV.t4xfhiL.raCqk4MYu3qbsX0u',2,'avatar_1638237574014_.png',0),(17,'amyWinehouse','Amy','Winehouse','amy@gmail.com','$2a$10$QzsBeWv/2Jqqk6/U6eS4h.yIeNhG7YVHL.BBX0byozv712204Gsrm',2,'avatar_1638378320350_.png',0),(18,'bjork','La','Bjork','bjork@gmail.com','$2a$10$R.cucsAQ0NY6ZBeeS/enReL3HnhSqNOHkXvribj7cXkIzHB6VWPuO',2,'avatar_1638378715556_.png',0),(19,'bobdylan','Bob','Dylan','bob@gmail.com','$2a$10$EffLLPofU6Civu8o5zBYsOqnQMoi5x6CdmsxipB79Hew6iDAS2CI6',2,'avatar_1638378775132_.png',0),(20,'boygeorge','Boy','George','boy@gmail.com','$2a$10$kYUUHZxuB9QP31KOCmtK7O9YLyNSO0Lz8uuSZ1P7Mkwd2SEhfSMdy',2,'avatar_1638378819903_.png',0),(21,'davegrohl','Dave','Grohl','dave@gmail.com','$2a$10$iizNvD0Hs.ReRSS0tOLbruz6n7M0tP2mo1wTpPZGi3UH31nkUjiwu',2,'avatar_1638378910542_.png',0),(22,'ziggystardus','Ziggy','Stardust','ziggy@gmail.com','$2a$10$RSJZ2XlUCMIT.POU5TPHsuhjKghIUtbI/bWR6DmKwH9h94sMh3Ryu',2,'avatar_1638378954855_.png',0),(23,'davidbowie','David','Bowie','david@gmail.com','$2a$10$KZJPRucu8K2CFl2FbwqNl.GcMNwvq64liXD1ABcWdH0JlE3xQ/myW',2,'avatar_1638378998630_.png',0),(24,'eltonjohn','Elton','John','elton@gmail.com','$2a$10$z6mQBC1pHcvpEETvDZH7qOb32lmv1648rie6z.x3JmwBIl8r5w9n2',2,'avatar_1638379028962_.png',0),(25,'freddiemercu','Freddie','Mercury','freddie@gmail.com','$2a$10$3mhXkDiANMYYinNTQUK5M.vNayx8mVZLzMC/lL9QjlnVj4GrWHjiK',2,'avatar_1638379073715_.png',0),(26,'georgemichae','George','Michael','george@gmail.com','$2a$10$vBXt6CVZM9oXBatlcCs7KeHu12I.gAKhLBY4sWdvot.teWmbmmPxi',2,'avatar_1638379154649_.png',0),(27,'johnlennon','John','Lennon','john@gmail.com','$2a$10$5XIsmF/8ga4/VLMiPu1aUeP7mYRoSKpP/VikFR1/m6sEg4vM.gZvS',2,'avatar_1638379179883_.png',0),(28,'katebush','Kate','Bush','kate@gmail.com','$2a$10$gVLMcY6DHiBWp.efjtTi0uqAFhVwvDY..LMnIjy3Jher3gdLxEWG2',2,'avatar_1638379217040_.png',0),(29,'kurtcobain','Kurt','Cobain','kurt@gmail.com','$2a$10$TqkXW621A2Qw/WA/aqVWYOfDtnX7qy5PtojoiJ5lrSCsP1FAfBdLy',2,'avatar_1638379250115_.png',0),(30,'madonna','Maddona','Sanchez','madonna@gmail.com','$2a$10$uEP9puYYSC2r2dr4i8nFDuCm8o9K5I0i9.Rb4CRYPxb6HjNuIHqDm',2,'avatar_1638379297789_.png',0),(31,'michaeljacks','Michael','Jackson','jackson@gmail.com','$2a$10$Hx2UpIU2yCp00uFHbVFIiOLmBgYJ92yvtRQxqvmMJ1N1PaitpwL0e',2,'avatar_1638379329973_.png',0),(32,'mickjagger','Mick','Jagger','jagger@gmail.com','$2a$10$ccOdYQSCuod3G3IngyTqDes4Q1YeyRJrgxNRZD3oOmR9SPeVp4S4.',2,'avatar_1638379371149_.png',0),(33,'morrissey','Morrissey','Fernandez','morrissey@gmail.com','$2a$10$g.rFog97T3PeWF9g72fGReWBRRCuhfMdfgE1TBdjepLx.w8IJCiIi',2,'avatar_1638379444175_.png',0),(34,'prince','Prince','Pereyra','prince@gmail.com','$2a$10$0/Y8P7BNXl3wJ.WvOrYFoepMHVuOwFe5eV7VOVRFG4kzymYeFDqPC',2,'avatar_1638379485639_.png',0),(35,'robertsmith','Robert','Smith','robert@gmail.com','$2a$10$cSpbP.6O9/W5cb2.prXIQ.YZGulRqKpbEmze.FRlBs/z50hA5Xoki',2,'avatar_1638379518456_.png',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cajitamusical_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-01 19:36:33
