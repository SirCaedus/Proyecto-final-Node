CREATE TABLE `catalogo` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`poster` varchar(20) NOT NULL,
	`titulo` varchar(80) NOT NULL,
	`idCategoria` INT NOT NULL,
	`resumen` TEXT NOT NULL,
	`temporadas` INT,
	`trailer` varchar(45) DEFAULT "N/A",
	PRIMARY KEY (`id`)
);

CREATE TABLE `categoria` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nombreCategoria` varchar(10) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `contenidoGeneros` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`idCatalogo` INT NOT NULL,
	`idGenero` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `generos` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nombreGenero` varchar(16) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `actores` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nombreActor` varchar(30) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `contenidoActores` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`idCatalogo` INT NOT NULL,
	`idActor` INT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `catalogo` ADD CONSTRAINT `catalogo_fk0` FOREIGN KEY (`idCategoria`) REFERENCES `categoria`(`id`);

ALTER TABLE `contenidoGeneros` ADD CONSTRAINT `contenidoGeneros_fk0` FOREIGN KEY (`idCatalogo`) REFERENCES `catalogo`(`id`);

ALTER TABLE `contenidoGeneros` ADD CONSTRAINT `contenidoGeneros_fk1` FOREIGN KEY (`idGenero`) REFERENCES `generos`(`id`);

ALTER TABLE `contenidoActores` ADD CONSTRAINT `contenidoActores_fk0` FOREIGN KEY (`idCatalogo`) REFERENCES `catalogo`(`id`);

ALTER TABLE `contenidoActores` ADD CONSTRAINT `contenidoActores_fk1` FOREIGN KEY (`idActor`) REFERENCES `actores`(`id`);

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `catalogoview` AS
    SELECT 
        `c`.`id` AS `id`,
        `c`.`poster` AS `poster`,
        `c`.`titulo` AS `titulo`,
        `ca`.`nombreCategoria` AS `categoria`,
        GROUP_CONCAT(DISTINCT `g`.`nombreGenero`
            SEPARATOR ', ') AS `generos`,
        `c`.`resumen` AS `resumen`,
        `c`.`temporadas` AS `temporadas`,
        GROUP_CONCAT(DISTINCT `a`.`nombreActor`
            SEPARATOR ', ') AS `reparto`,
        `c`.`trailer` AS `trailer`
    FROM
        (((((`catalogo` `c`
        JOIN `categoria` `ca` ON (`c`.`idCategoria` = `ca`.`id`))
        LEFT JOIN `contenidogeneros` `cg` ON (`c`.`id` = `cg`.`idCatalogo`))
        LEFT JOIN `generos` `g` ON (`cg`.`idGenero` = `g`.`id`))
        LEFT JOIN `contenidoactores` `caa` ON (`c`.`id` = `caa`.`idCatalogo`))
        LEFT JOIN `actores` `a` ON (`caa`.`idActor` = `a`.`id`))
    GROUP BY `c`.`id


