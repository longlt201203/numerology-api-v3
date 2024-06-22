-- numerology.account definition

CREATE TABLE `account` (
  `id` varchar(36) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_4c8f96ccf523e9a3faefd5bdd4` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- numerology.numerology_entry definition

CREATE TABLE `numerology_entry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` int NOT NULL,
  `psychicDescription` text NOT NULL,
  `destinyDescription` text NOT NULL,
  `nameDescription` text NOT NULL,
  `yearDescription` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_b5350818e9b60b8512a6aaa697` (`number`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- numerology.numerology_reading_record definition

CREATE TABLE `numerology_reading_record` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lsName` varchar(255) NOT NULL,
  `dob` datetime NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `psychicNumber` int NOT NULL,
  `destinyNumber` int NOT NULL,
  `firstNameNumber` int NOT NULL,
  `fullNameNumber` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;