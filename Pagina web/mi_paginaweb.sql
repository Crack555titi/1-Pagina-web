-- phpMyAdmin SQL Dump
-- version 5.2.1
--  pag web uwu---> http://localhost/1-Pagina-web/
-- https://www.phpmyadmin.net/

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";




--
-- Estructura de tabla para la tabla :D
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `validacion` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
ALTER TABLE usuarios ADD COLUMN avatar MEDIUMTEXT NULL;
--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `password`, `validacion`) VALUES
(1, 'Juan', 'Pérez', 'juan@email.com', '12tititete', 1);
--
-- Indices de la tabla user
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
  
ALTER TABLE usuarios
  ADD COLUMN plan VARCHAR(20) NULL,
  ADD COLUMN alcance VARCHAR(10) NULL,
  ADD COLUMN deportes TEXT NULL,
  ADD COLUMN pago_estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',
  ADD COLUMN pago_ref VARCHAR(64) NULL;
--
-- Incrementar tabla user
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

--
-- Tabla de pagos (cada plan o deporte se paga por separado)
--
CREATE TABLE `pagos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `concepto` varchar(100) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `pago_ref` varchar(64) NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'en_revision',
  `creado` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pago_ref` (`pago_ref`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Funcionalidades nuevas de Aerus Club. Ejecutar una sola vez sobre la base existente.
ALTER TABLE usuarios ADD COLUMN rol VARCHAR(20) NOT NULL DEFAULT 'socio';
ALTER TABLE usuarios ADD COLUMN sede VARCHAR(100) NULL;
ALTER TABLE usuarios ADD COLUMN cuota_hasta DATE NULL;
ALTER TABLE pagos ADD COLUMN revisado DATETIME NULL;
ALTER TABLE pagos ADD COLUMN sede VARCHAR(100) NULL;

CREATE TABLE comentarios (
 id INT AUTO_INCREMENT PRIMARY KEY, usuario_id INT NOT NULL, tipo VARCHAR(20) NOT NULL DEFAULT 'club',
 referencia VARCHAR(100) NOT NULL DEFAULT 'Club', calificacion TINYINT NOT NULL,
 comentario VARCHAR(1500) NOT NULL, estado ENUM('pendiente','aprobado','rechazado') NOT NULL DEFAULT 'pendiente',
 creado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT comentarios_usuario_fk FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE mensajes_contacto (
 id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(120) NOT NULL, email VARCHAR(190) NOT NULL,
 asunto VARCHAR(150) NOT NULL, mensaje TEXT NOT NULL, estado VARCHAR(20) NOT NULL DEFAULT 'nuevo',
 creado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE clases (
 id INT AUTO_INCREMENT PRIMARY KEY, deporte VARCHAR(100) NOT NULL, sede VARCHAR(100) NOT NULL,
 fecha DATETIME NOT NULL, cupo INT NOT NULL DEFAULT 10, descripcion VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE reservas (
 id INT AUTO_INCREMENT PRIMARY KEY, clase_id INT NOT NULL, usuario_id INT NOT NULL,
 estado ENUM('reservada','cancelada') NOT NULL DEFAULT 'reservada', creado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE KEY reserva_unica (clase_id,usuario_id),
 CONSTRAINT reservas_clase_fk FOREIGN KEY (clase_id) REFERENCES clases(id) ON DELETE CASCADE,
 CONSTRAINT reservas_usuario_fk FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE eventos (
 id INT AUTO_INCREMENT PRIMARY KEY, titulo VARCHAR(150) NOT NULL, descripcion VARCHAR(500) NULL,
 sede VARCHAR(100) NOT NULL, fecha DATETIME NOT NULL, creado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO clases(deporte,sede,fecha,cupo,descripcion) VALUES
('Fútbol 5','Palomar',DATE_ADD(NOW(),INTERVAL 3 DAY),12,'Clase introductoria gratuita'),
('Vóley mixto','Villa Luzuriaga',DATE_ADD(NOW(),INTERVAL 5 DAY),10,'Traé ropa cómoda y ganas de jugar'),
('Musculación','Parque Patricio',DATE_ADD(NOW(),INTERVAL 7 DAY),8,'Recorrido inicial por el gimnasio');
INSERT INTO eventos(titulo,descripcion,sede,fecha) VALUES
('Encuentro deportivo de primavera','Jornada recreativa para todas las edades.','Palomar',DATE_ADD(NOW(),INTERVAL 10 DAY)),
('Clínica abierta de vóley','Actividad de demostración para socios y visitantes.','Villa Luzuriaga',DATE_ADD(NOW(),INTERVAL 14 DAY)),
('Torneo amistoso del club','Fixture de muestra; confirmar horarios con administración.','Parque Patricio',DATE_ADD(NOW(),INTERVAL 21 DAY));

CREATE TABLE recuperaciones (
 id INT AUTO_INCREMENT PRIMARY KEY, usuario_id INT NOT NULL, token_hash CHAR(64) NOT NULL,
 vence DATETIME NOT NULL, usado TINYINT NOT NULL DEFAULT 0, creado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 KEY token_hash_idx(token_hash), CONSTRAINT recuperaciones_usuario_fk FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
