-- SCRIPT TO DROP ALL THE CURRENT TABLES, CREATE THEM AGAIN AND ADD SAMPLE DATA

-- DROP ALL TABLES IF THEY EXIST
DROP TABLE IF EXISTS MaterialesRecomendados;
DROP TABLE IF EXISTS MaterialesSalas;
DROP TABLE IF EXISTS ReservacionesMateriales;
DROP TABLE IF EXISTS Reservaciones;
DROP TABLE IF EXISTS Experiencias;
DROP TABLE IF EXISTS Salas;
DROP TABLE IF EXISTS Materiales;
DROP TABLE IF EXISTS UsuariosLogros;
DROP TABLE IF EXISTS Logros;
DROP TABLE IF EXISTS GruposUsuarios;
DROP TABLE IF EXISTS Credenciales;
DROP TABLE IF EXISTS Usuarios;
DROP TABLE IF EXISTS UnidadesFormacion;



-- CREATE THE TABLES
CREATE TABLE UnidadesFormacion (
    idUF INT PRIMARY KEY,
    nombre VARCHAR(255)
);

CREATE TABLE Usuarios (
    idUsuario VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(255),
    apellidoP VARCHAR(255),
    apellidoM VARCHAR(255),
    tipo VARCHAR(50),
    prioridad INT
);

CREATE TABLE Credenciales (
    token VARCHAR(255) PRIMARY KEY,
    idUsuario VARCHAR(10),
    contrasena VARCHAR(255),
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario)
);

CREATE TABLE GruposUsuarios (
    idUF INT,
    idUsuario VARCHAR(10),
    FOREIGN KEY (idUF) REFERENCES UnidadesFormacion(idUF),
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
    PRIMARY KEY (idUF, idUsuario)
);

CREATE TABLE Logros (
    idLogro INT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion VARCHAR(255),
    prioridadOtorgada INT
);

CREATE TABLE UsuariosLogros (
    idLogro INT,
    idUsuario VARCHAR(10),
    estatus VARCHAR(50),
    FOREIGN KEY (idLogro) REFERENCES Logros(idLogro),
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
    PRIMARY KEY (idLogro, idUsuario)
);

CREATE TABLE Materiales (
    idMaterial INT PRIMARY KEY,
    nombre VARCHAR(255),
    fotoURL VARCHAR(255)
);

CREATE TABLE Salas (
    idSala INT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion VARCHAR(255),
    cantidadMesas INT,
    fotoURL VARCHAR(255)
);

CREATE TABLE Experiencias (
    idExperiencia INT PRIMARY KEY,
    idUF INT,
    idSala INT,
    nombre VARCHAR(255),
    descripcion VARCHAR(255),
    esAutoDirigida BIT,
    portadaURL VARCHAR(255),
    fechaInicio DATE,
    fechaFin DATE,
    horaFin TIME,
    FOREIGN KEY (idUF) REFERENCES UnidadesFormacion(idUF),
    FOREIGN KEY (idSala) REFERENCES Salas(idSala)
);

CREATE TABLE Reservaciones (
    idReservacion INT PRIMARY KEY,
    idUsuario VARCHAR(10),
    idSala INT,
    idExperiencia INT,
    horaInicio TIME,
    duracion FLOAT,
    fecha DATE,
    numMesa INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
    FOREIGN KEY (idSala) REFERENCES Salas(idSala),
    FOREIGN KEY (idExperiencia) REFERENCES Experiencias(idExperiencia)
);

CREATE TABLE ReservacionesMateriales (
    idReservacion INT,
    idMaterial INT,
    cantidad INT,
    estatus VARCHAR(50),
    FOREIGN KEY (idReservacion) REFERENCES Reservaciones(idReservacion),
    FOREIGN KEY (idMaterial) REFERENCES Materiales(idMaterial),
    PRIMARY KEY (idReservacion, idMaterial)
);

CREATE TABLE MaterialesSalas (
    idSala INT,
    idMaterial INT,
    cantidad INT,
    FOREIGN KEY (idSala) REFERENCES Salas(idSala),
    FOREIGN KEY (idMaterial) REFERENCES Materiales(idMaterial),
    PRIMARY KEY (idSala, idMaterial)
);

CREATE TABLE MaterialesRecomendados (
    idExperiencia INT,
    idMaterial INT,
    cantidad INT,
    FOREIGN KEY (idExperiencia) REFERENCES Experiencias(idExperiencia),
    FOREIGN KEY (idMaterial) REFERENCES Materiales(idMaterial),
    PRIMARY KEY (idExperiencia, idMaterial)
);



-- ADD SAMPLE DATA TO THE TABLES
-- Sample data for UnidadesFormacion
INSERT INTO UnidadesFormacion (idUF, nombre) VALUES 
(1, 'Unidad Formación 1'),
(2, 'Unidad Formación 2');

-- Sample data for Usuarios
INSERT INTO Usuarios (idUsuario, nombre, apellidoP, apellidoM, tipo, prioridad) VALUES
('A01177767', 'Christopher Gabriel', 'Pedraza', 'Pohlenz', 'Regular', 1),
('L00000000', 'Rolando', 'Pérez', '', 'Profesor', 2);

-- Sample data for Credenciales
INSERT INTO Credenciales (token, idUsuario, contrasena) VALUES
('5dc98289890b193dd625ba2479de47abcb07936a2d3b3f06b71b73ed6df1a982fb49932954d5607e09f996a6c51c52952468b4ab31cb256d701536ffa5bd3855', 'A01177767', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2'),
('1fbd43b821c26b801d22dfe5984e36cbed1ef282531d2981de11b707bd4bcdfd6276cfbbafa5075cba9efbeb34d0ce4c06ec5c5bee6079bf9469e76489715113', 'L00000000', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2');

-- Sample data for GruposUsuarios
INSERT INTO GruposUsuarios (idUF, idUsuario) VALUES
(1, 'A01177767'),
(2, 'L00000000');

-- Sample data for Logros
INSERT INTO Logros (idLogro, nombre, descripcion, prioridadOtorgada) VALUES
(1, 'Logro 1', 'Descripción logro 1', 1),
(2, 'Logro 2', 'Descripción logro 2', 2);

-- Sample data for UsuariosLogros
INSERT INTO UsuariosLogros (idLogro, idUsuario, estatus) VALUES
(1, 'A01177767', 'Activo'),
(2, 'L00000000', 'Inactivo');

-- Sample data for Materiales
INSERT INTO Materiales (idMaterial, nombre, fotoURL) VALUES
(1, 'Material 1', 'url_material_1'),
(2, 'Material 2', 'url_material_2');

-- Sample data for Salas
INSERT INTO Salas (idSala, nombre, descripcion, cantidadMesas, fotoURL) VALUES
(1, 'Electric Garage', 'Este espacio dinámico y versátil es un sueño hecho realidad para los entusiastas de la electrónica. Equipado con las últimas herramientas y tecnologías, es el lugar ideal para dar vida a tus proyectos más ambiciosos.', 8, 'url_electric_garage'),
(2, 'Dimension Forge', 'Un laboratorio de vanguardia donde la creatividad se fusiona con la tecnología. Aquí, los innovadores pueden explorar libremente nuevas ideas y experimentar con las últimas herramientas de diseño y fabricación.', 6, 'https://dreamlabstorage.blob.core.windows.net/archivos/vr-lede.jpg'),
(3, 'New Horizons', 'Inspirado por la curiosidad y el deseo de explorar lo desconocido, New Horizons es un lugar donde los límites de la tecnología se desdibujan. Desde la inteligencia artificial hasta la exploración espacial, aquí se dan los primeros pasos hacia el futuro.', 7, 'url_new_horizons'),
(4, 'Deep Net', 'Sumérgete en las profundidades de la seguridad informática y las redes con Deep Net. Equipado con tecnología de última generación y expertos en el campo, es el lugar perfecto para poner a prueba tus habilidades y descubrir nuevos horizontes en el ciberespacio.', 5, 'url_deep_net'),
(5, 'Graveyard', 'No es un lugar de descanso, sino de reinvención. Graveyard es donde las ideas obsoletas encuentran una nueva vida y las tecnologías pasadas se transforman en innovaciones futuras. Es el punto de partida para los visionarios y los revolucionarios.', 9, 'url_graveyard'),
(6, 'PCB Factory', 'Desde prototipos hasta producción en masa, PCB Factory ofrece un entorno especializado para el diseño y la fabricación de placas de circuito impreso. Con equipos de alta precisión y experiencia técnica, cada proyecto encuentra su camino hacia el éxito.', 10, 'url_pcb_factory'),
(7, 'Hack-Battlefield', 'Adéntrate en un campo de pruebas donde la habilidad y la estrategia son tus armas. Hack-Battlefield es el lugar donde los expertos en seguridad informática se enfrentan para poner a prueba sus habilidades y proteger los sistemas de mañana.', 6, 'url_hack_battlefield'),
(8, 'Testing Land', 'Un terreno fértil para la innovación y el desarrollo tecnológico. Aquí, los proyectos toman forma y se someten a rigurosas pruebas para garantizar su calidad y fiabilidad. Es el punto de partida para las soluciones del futuro.', 8, 'url_testing_land'),
(9, 'War Headquarters', 'El corazón estratégico de las operaciones tecnológicas avanzadas. War Headquarters es donde se planifican y ejecutan los proyectos más ambiciosos, donde la creatividad se encuentra con la ingeniería para dar forma al futuro de la tecnología.', 5, 'url_war_headquarters'),
(10, 'Biometrics Flexible Hall', 'En un mundo donde la identidad es fundamental, Biometrics Flexible Hall ofrece un entorno adaptable para la investigación y el desarrollo de sistemas biométricos. Desde el reconocimiento facial hasta la autenticación de voz, aquí se están construyendo las soluciones de seguridad del mañana.', 7, 'url_biometrics_flexible_hall'),
(11, 'Beyond-Digits', 'Más allá de los límites convencionales de la tecnología, Beyond-Digits es donde las ideas audaces encuentran su hogar. Aquí, los innovadores exploran nuevas fronteras, desde la inteligencia artificial hasta la computación cuántica, dando forma al futuro con cada línea de código.', 9, 'url_beyond_digits');


-- Sample data for Experiencias
INSERT INTO Experiencias (idExperiencia, idUF, idSala, nombre, descripcion, esAutoDirigida, portadaURL, fechaInicio, fechaFin, horaFin) VALUES
(1, null, 3, 'Hackers Event', 'Evento sobre testing y ciberseguridad', 0, 'url_portada_1', '2024-01-01', '2024-01-07', '18:00:00'),
(2, null, 3, 'Cisco Experience', 'Uso de routers para redes y ciberseguridad', 0, 'url_portada_2', '2024-02-01', '2024-02-07', '20:00:00'),
(3, null, 1, 'Game jam event', 'Evento sobre todo tipos de videojuegos incluyendo de distintas ', 0, 'url_portada_3', '2024-01-03', '2024-01-03', '18:00:00'),
(4, null, 1, 'Presentación Apple Vision Pro', 'Evento donde se hablara de los lentes de realidad virtual de Apple y se prestarán', 0, 'url_portada_4', '2024-03-01', '2024-03-07', '20:00:00'),
(5, null, 2, 'Creando tu primer circuito', 'Evento para aprender a crear tu primer circuito de electronica.', 0, 'url_portada_5', '2024-01-04', '2024-01-05', '18:00:00'),
(6, null, 2, 'Introducción a Electrónica', 'Práctica autodirigida donde puedes aprender los primeros pasos en el ámbito de la electrónica ', 1, 'url_portada_6', '2024-01-01', '2024-08-02', '20:00:00');

-- Sample data for Reservaciones
INSERT INTO Reservaciones (idReservacion, idUsuario, idSala, idExperiencia, horaInicio, duracion, fecha, numMesa) VALUES
(1, 'A01177767', 1, 1, '10:00:00', 2.5, '2024-01-01', 2),
(2, 'L00000000', 2, 2, '15:00:00', 1.5, '2024-02-01', 1);

-- Sample data for ReservacionesMateriales
INSERT INTO ReservacionesMateriales (idReservacion, idMaterial, cantidad, estatus) VALUES
(1, 1, 5, 'Completado'),
(2, 2, 3, 'En progreso');

-- Sample data for MaterialesSalas
INSERT INTO MaterialesSalas (idSala, idMaterial, cantidad) VALUES
(1, 1, 10),
(2, 2, 8);

-- Sample data for MaterialesRecomendados
INSERT INTO MaterialesRecomendados (idExperiencia, idMaterial, cantidad) VALUES
(1, 1, 3),
(2, 2, 4);
