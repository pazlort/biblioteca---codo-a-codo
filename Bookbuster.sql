CREATE DATABASE IF NOT EXISTS Bookbuster CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI; USE Bookbuster;

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
	id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	username VARCHAR(50) NOT NULL,
    pass_user VARCHAR(100) NOT NULL,
	firstname VARCHAR(50) NOT NULL,
	lastname VARCHAR(50) NOT NULL,
    id_rol TINYINT(1),
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	update_at TIMESTAMP NULL,
	delete_at TIMESTAMP NULL,
    delete_by_user INT NULL,
	state TINYINT(1)
) ENGINE=INNODB CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Crear la tabla de roles
CREATE TABLE IF NOT EXISTS roles (
    id_rol INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL,
    delete_at TIMESTAMP NULL,
    delete_by_user INT NULL,
    state TINYINT(1)
) ENGINE=INNODB CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Crear la tabla de libros
CREATE TABLE IF NOT EXISTS libros (
    id_libro INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo_libro VARCHAR(50) NOT NULL,
    autor_libro VARCHAR(100) NOT NULL,
    editorial_libro VARCHAR(50) NOT NULL,
    url_img VARCHAR(100) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL,
    delete_at TIMESTAMP NULL,
    delete_by_user INT NULL,
    state TINYINT(1)
) ENGINE=INNODB CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Crear la tabla de prestamos
CREATE TABLE IF NOT EXISTS prestamos (
    id_prestamo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_libro INT NOT NULL,
    fecha_desde DATETIME NOT NULL,
    fecha_hasta INT NOT NULL,
    observaciones VARCHAR(255),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL,
    delete_at TIMESTAMP NULL,
    delete_by_user INT NULL,
    state TINYINT(1),
    FOREIGN KEY (usuario_id) REFERENCES prestamos(id)
) ENGINE=InnoDB CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Trigger para actualizar update_at en usuarios
DELIMITER //
CREATE TRIGGER update_update_at_usuarios BEFORE
UPDATE ON usuarios FOR EACH ROW BEGIN
    SET NEW.update_at = NOW();
END;
//
DELIMITER ;

-- Trigger para manejar eliminación en usuarios
DELIMITER //
CREATE TRIGGER update_delete_at_on_state_usuarios BEFORE
UPDATE ON usuarios FOR EACH ROW BEGIN
    IF NEW.state = 0 THEN
        SET NEW.delete_at = NOW();
    END IF;
END;
//
DELIMITER ;


-- Trigger para actualizar update_at en roles
DELIMITER //
CREATE TRIGGER update_update_at_roles BEFORE
UPDATE ON roles FOR EACH ROW BEGIN
    SET NEW.update_at = NOW();
END;
//
DELIMITER ;

-- Trigger para manejar eliminación en roles
DELIMITER //
CREATE TRIGGER update_delete_at_on_state_roles BEFORE
UPDATE ON roles FOR EACH ROW BEGIN
    IF NEW.state = 0 THEN
        SET NEW.delete_at = NOW();
    END IF;
END;
//
DELIMITER ;

-- Trigger para actualizar update_at en libros
DELIMITER //
CREATE TRIGGER update_update_at_libros BEFORE
UPDATE ON libros FOR EACH ROW BEGIN
    SET NEW.update_at = NOW();
END;
//
DELIMITER ;

-- Trigger para manejar eliminación en libros
DELIMITER //
CREATE TRIGGER update_delete_at_on_state_libros BEFORE
UPDATE ON libros FOR EACH ROW BEGIN
    IF NEW.state = 0 THEN
        SET NEW.delete_at = NOW();
    END IF;
END;
//
DELIMITER ;

-- Trigger para actualizar update_at en prestamos
DELIMITER //
CREATE TRIGGER update_update_at_prestamos BEFORE
UPDATE ON prestamos FOR EACH ROW BEGIN
    SET NEW.update_at = NOW();
END;
//
DELIMITER ;

-- Trigger para manejar eliminación en prestamos
DELIMITER //
CREATE TRIGGER update_delete_at_on_state_prestamos BEFORE
UPDATE ON prestamos FOR EACH ROW BEGIN
    IF NEW.state = 0 THEN
        SET NEW.delete_at = NOW();
    END IF;
END;
//
DELIMITER ;

INSERT INTO usuarios
    (email, username, pass_user, firstname, lastname, id_rol, create_at, update_at, delete_at, delete_by_user, state)
    VALUES
    ('usuario1@example.com', 'usuario1', 'clave1', 'Nombre1', 'Apellido1', '1', NOW(), NULL, NULL, NULL, 1),
    ('usuario2@example.com', 'usuario2', 'clave2', 'Nombre2', 'Apellido2', '2', NOW(), NULL, NULL, NULL, 1),
    ('usuario3@example.com', 'usuario3', 'clave3', 'Nombre3', 'Apellido3', '2', NOW(), NULL, NULL, NULL, 1),
    ('usuario4@example.com', 'usuario4', 'clave4', 'Nombre4', 'Apellido4', '3', NOW(), NULL, NULL, NULL, 1),
    ('usuario5@example.com', 'usuario5', 'clave5', 'Nombre5', 'Apellido5', '3', NOW(), NULL, NULL, NULL, 1);

INSERT INTO roles
    (name, create_at, update_at, delete_at, delete_by_user, state)
    VALUES
    ('Administrador', NOW(), NULL, NULL, NULL, 1),
    ('Gestor', NOW(), NULL, NULL, NULL, 1),
    ('Usuario', NOW(), NULL, NULL, NULL, 1);

INSERT INTO libros
    (titulo_libro, autor_libro, editorial_libro, url_img, create_at, update_at, delete_at, delete_by_user, state)
    VALUES
    ('titulo1', 'autor1', 'editorial1', '2020-01-01', NOW(), NULL, NULL, NULL, 1),
    ('titulo2', 'autor2', 'editorial2', '2020-01-01', NOW(), NULL, NULL, NULL, 1),
    ('titulo3', 'autor3', 'editorial3', '2020-01-01', NOW(), NULL, NULL, NULL, 1),
    ('titulo4', 'autor4', 'editorial4', '2020-01-01', NOW(), NULL, NULL, NULL, 1),
    ('titulo5', 'autor5', 'editorial5', '2020-01-01', NOW(), NULL, NULL, NULL, 1);

INSERT INTO prestamos
    (id_user, id_libro, fecha_desde, fecha_hasta, observaciones, create_at, update_at, delete_at, delete_by_user, state)
    VALUES
    ('1', '1', '2020-01-01', '2020-12-31', 'observaciones', NOW(), NULL, NULL, NULL, 1),
    ('2', '2', '2020-01-01', '2020-12-31', 'observaciones', NOW(), NULL, NULL, NULL, 1),
    ('3', '3', '2020-01-01', '2020-12-31', 'observaciones', NOW(), NULL, NULL, NULL, 1),
    ('4', '4', '2020-01-01', '2020-12-31', 'observaciones', NOW(), NULL, NULL, NULL, 1),
    ('5', '5', '2020-01-01', '2020-12-31', 'observaciones', NOW(), NULL, NULL, NULL, 1);

