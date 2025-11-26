-- CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE items_database;

-- CREACIÓN DE LA TABLA ITEMS
CREATE TABLE items_database.items(
    id INT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(100),
    brand VARCHAR(100),
    item_type VARCHAR(100),
    price DOUBLE
);

-- CREACIÓN DE LA TABLA USERS
CREATE TABLE items_database.users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(255),
    user_login VARCHAR(50),
    user_password VARCHAR(50),
    user_role VARCHAR(25)
);

-- INSERTAR LOS USUARIOS DE LA BASE DE DATOS
INSERT INTO items_database.users (id, user_name, user_login, user_password, user_role) VALUES
(1, 'Patricia', 'patricia', '1234', 'admin'),
(2, 'Usuario', 'user', '1234', 'user');