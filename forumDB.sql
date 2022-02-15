-- --------------------------------------------------------
-- Värd:                         127.0.0.1
-- Serverversion:                10.4.17-MariaDB - mariadb.org binary distribution
-- Server-OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumpar databasstruktur för forum
CREATE DATABASE IF NOT EXISTS `forum` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `forum`;

-- Dumpar struktur för tabell forum.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `creation_date` datetime(6) DEFAULT NULL,
  `last_edited` datetime(6) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `commenter_id` bigint(20) NOT NULL,
  `thread_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4jh8ht3vtgr6ibapo4yxe81gr` (`commenter_id`),
  KEY `FKowxb1mrw8j0kq7y01c68jc097` (`thread_id`),
  CONSTRAINT `FK4jh8ht3vtgr6ibapo4yxe81gr` FOREIGN KEY (`commenter_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKowxb1mrw8j0kq7y01c68jc097` FOREIGN KEY (`thread_id`) REFERENCES `threads` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumpar data för tabell forum.comments: ~0 rows (ungefär)
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` (`id`, `creation_date`, `last_edited`, `text`, `commenter_id`, `thread_id`) VALUES
	(1, '2022-02-13 20:31:34.000000', NULL, 'Nice!', 8, 4);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;

-- Dumpar struktur för tabell forum.threads
CREATE TABLE IF NOT EXISTS `threads` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `blocked_thread_status` bit(1) NOT NULL,
  `creation_date` datetime(6) DEFAULT NULL,
  `last_edited` datetime(6) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `creator_id` bigint(20) NOT NULL,
  `topic_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3q3labaq8urioebqk91tpk0o8` (`creator_id`),
  KEY `FKodpynht4j6exhk5dvhnm3icl8` (`topic_id`),
  CONSTRAINT `FK3q3labaq8urioebqk91tpk0o8` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKodpynht4j6exhk5dvhnm3icl8` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Dumpar data för tabell forum.threads: ~6 rows (ungefär)
/*!40000 ALTER TABLE `threads` DISABLE KEYS */;
INSERT INTO `threads` (`id`, `blocked_thread_status`, `creation_date`, `last_edited`, `text`, `title`, `creator_id`, `topic_id`) VALUES
	(1, b'0', '2022-02-03 17:30:43.000000', '2022-02-03 17:30:43.000000', 'Var ska man åka på utflykt med hunden i närheten av Malmö?', 'Tips på utflyktsmål', 3, 1),
	(2, b'0', '2022-01-23 18:27:08.000000', '2022-02-13 20:29:07.000000', 'Jag vet att det är nyttigt för kroppen men vem startade trenden?', 'Varför ska alla vinterbada helt plötsligt?', 4, 1),
	(3, b'0', '2021-12-09 01:29:29.000000', '2021-12-09 01:29:29.000000', 'Snökedjor är väldigt bra när de behövs men hur ofta har ni råkat ut för det i Skåne?', 'Hur många gånger har ni behövt snökedjor i Skåne?', 5, 2),
	(4, b'0', '2021-10-09 20:29:51.000000', '2021-10-09 20:29:51.000000', 'Hur mycket tid la jag förra året på mina tomater? Plantering, omplantering, vattning, flytta runt för optimal mängd sol. Jag var även tvungen att fixa passning när vi åkte på semester. Är det värt allt detta för att få äta hemodlade tomater?', 'Nu ska alla odla och stressen ökar', 6, 3),
	(5, b'0', '2021-11-17 22:30:16.000000', '2021-11-17 22:30:16.000000', 'Inför sommaren vore det najs med en vältränad mage men jag hatar att lägga mig på golvet. Vad ska jag göra?', 'Hur ska jag träna min mage utan att behöva ligga på golvet?', 7, 2),
	(6, b'0', '2022-02-13 16:30:39.000000', '2022-02-13 16:30:39.000000', 'Har länge velat ha en porsche. Känns sjukt retligt när man måste köra om en som är ombyggd till A-traktor. Är detta ok?', 'Är det ok att bygga om en Porsche till A-traktor?', 8, 4);
/*!40000 ALTER TABLE `threads` ENABLE KEYS */;

-- Dumpar struktur för tabell forum.thread_bans
CREATE TABLE IF NOT EXISTS `thread_bans` (
  `thread_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`thread_id`,`user_id`),
  KEY `FK9hm3ai7k4bnlqtjf65bdxyoi8` (`user_id`),
  CONSTRAINT `FK9hm3ai7k4bnlqtjf65bdxyoi8` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKftv5gakielhmiokmgry348ol9` FOREIGN KEY (`thread_id`) REFERENCES `threads` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumpar data för tabell forum.thread_bans: ~0 rows (ungefär)
/*!40000 ALTER TABLE `thread_bans` DISABLE KEYS */;
/*!40000 ALTER TABLE `thread_bans` ENABLE KEYS */;

-- Dumpar struktur för tabell forum.thread_moderators
CREATE TABLE IF NOT EXISTS `thread_moderators` (
  `thread_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`thread_id`,`user_id`),
  KEY `FKaft1u22cn6hbcvx8eyk7a2h98` (`user_id`),
  CONSTRAINT `FKaft1u22cn6hbcvx8eyk7a2h98` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKr5ce8roq0c9ov5sr9qqo7skv9` FOREIGN KEY (`thread_id`) REFERENCES `threads` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumpar data för tabell forum.thread_moderators: ~0 rows (ungefär)
/*!40000 ALTER TABLE `thread_moderators` DISABLE KEYS */;
INSERT INTO `thread_moderators` (`thread_id`, `user_id`) VALUES
	(4, 5);
/*!40000 ALTER TABLE `thread_moderators` ENABLE KEYS */;

-- Dumpar struktur för tabell forum.topics
CREATE TABLE IF NOT EXISTS `topics` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumpar data för tabell forum.topics: ~4 rows (ungefär)
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` (`id`, `name`) VALUES
	(1, 'Friluft'),
	(2, 'Sport'),
	(3, 'Trädgård'),
	(4, 'Bilar');
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;

-- Dumpar struktur för tabell forum.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `blocked` bit(1) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Dumpar data för tabell forum.users: ~0 rows (ungefär)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `blocked`, `date`, `deleted`, `email`, `password`, `role`, `username`) VALUES
	(1, b'0', NULL, b'0', 'Lasse74@mail.se', '$2a$10$HFfmqiPdjNjxIkhL8bBP6eZkeviYUdLIBHX46WRUawgljKqZpe04y', 'ROLE_ADMIN', 'Lasse74'),
	(2, b'0', NULL, b'0', 'abc@mail.se', '$2a$10$2XN2GnKRbx6znah2qO.QQ.B91OiMcn.vcvbopBQRs.BppxxNWqGXy', 'ROLE_USER', 'abc'),
	(3, b'1', NULL, b'1', 'maja@gmail.cum', '$2a$10$0ybJKeHPxnfrG7tYpCZp4.klJPSH80aBozT7vZYhd9FOe88G1cJ8G', 'ROLE_USER', 'maja'),
	(4, b'0', NULL, b'0', 'lassemaja@hotmail.se', '$2a$10$bXNsg4UB/6aI.Dp4swdnp.XtXMwNrn3.gKAKVDkJE5fr52cSATr8a', 'ROLE_USER', 'lassemaja'),
	(5, b'0', NULL, b'0', 'nisse@mail.cum', '$2a$10$lyJKD8zlVkRZm9ybQ7t7MOjy5OVnpefwutoMlfTwGZgqzQCPLkHD.', 'ROLE_USER', 'nisse'),
	(6, b'0', NULL, b'0', 'hemlis@protonmail.com', '$2a$10$FRxek75uhCB6saA.N39DhuYW3DL8Tk3utNvB/0UY7wAa7TEKzcgQu', 'ROLE_USER', 'hemlis'),
	(7, b'0', NULL, b'0', 'ollenisse@mailapp.ssee', '$2a$10$cONRofgYVCCR6YeSK36/OeqJ7jUoyZfSTmOG910vZvWJgfabexZpq', 'ROLE_USER', 'ollenisse'),
	(8, b'0', NULL, b'0', 'ollebolle@olle.se', '$2a$10$EFczDhrXvQv4ooB7BcSbQunqhhPn8Psjg3JUVfe/TzKGlGbp7Zhai', 'ROLE_USER', 'ollebolle');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
