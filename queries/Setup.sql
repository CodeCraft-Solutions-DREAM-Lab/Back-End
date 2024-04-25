-- SCRIPT TO DROP ALL THE CURRENT TABLES, CREATE THEM AGAIN AND ADD SAMPLE DATA

-- DROP ALL TABLES IF THEY EXIST
DROP TABLE IF EXISTS MaterialesRecomendados;
DROP TABLE IF EXISTS MaterialesSalas;
DROP TABLE IF EXISTS ReservacionesMateriales;
DROP TABLE IF EXISTS Reservaciones;
DROP TABLE IF EXISTS Experiencias;
DROP TABLE IF EXISTS Mesas;
DROP TABLE IF EXISTS Salas;
DROP TABLE IF EXISTS Materiales;
DROP TABLE IF EXISTS UsuariosLogros;
DROP TABLE IF EXISTS Logros;
DROP TABLE IF EXISTS GruposUsuarios;
DROP TABLE IF EXISTS Credenciales;
DROP TABLE IF EXISTS Usuarios;
DROP TABLE IF EXISTS UnidadesFormacion;
DROP TABLE IF EXISTS Estatus;



-- CREATE THE TABLES
CREATE TABLE UnidadesFormacion (
    idUF INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255)
);

CREATE TABLE Usuarios (
    idUsuario VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(255),
    apellidoP VARCHAR(255),
    apellidoM VARCHAR(255),
    tipo VARCHAR(50),
    prioridad INT,
	logroPrincipal INT
);

CREATE TABLE Credenciales (
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
    idLogro INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255),
    descripcion VARCHAR(500),
    prioridadOtorgada INT,
	iconoURL VARCHAR(255),
	color VARCHAR(100),
	valorMax INT
);

CREATE TABLE UsuariosLogros (
    idLogro INT,
    idUsuario VARCHAR(10),
	valorActual INT,
    estatus BIT,
    FOREIGN KEY (idLogro) REFERENCES Logros(idLogro),
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
    PRIMARY KEY (idLogro, idUsuario)
);

CREATE TABLE Materiales (
    idMaterial INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255),
    fotoURL VARCHAR(255)
);

CREATE TABLE Salas (
    idSala INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255),
    cantidadMesas INT,
    descripcion VARCHAR(500),
    fotoURL VARCHAR(255), -- Remove the comma here
    detallesURL VARCHAR(255)
);

CREATE TABLE Mesas (
    idMesa INT PRIMARY KEY IDENTITY(1,1),
    idSala INT,
    cupos INT,
    FOREIGN KEY (idSala) REFERENCES Salas(idSala)
);

CREATE TABLE Experiencias (
    idExperiencia INT PRIMARY KEY IDENTITY(1,1),
    idUF INT,
    idSala INT,
    nombre VARCHAR(255),
    descripcion VARCHAR(500),
    esAutoDirigida BIT,
	esExclusivaUF BIT,
    portadaURL VARCHAR(255),
    fechaInicio DATE,
    fechaFin DATE,
    horaFin TIME,
    FOREIGN KEY (idUF) REFERENCES UnidadesFormacion(idUF),
    FOREIGN KEY (idSala) REFERENCES Salas(idSala)
);

CREATE TABLE Estatus (
    idEstatus INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50),
    descripcion VARCHAR(100)
);

CREATE TABLE Reservaciones (
    idReservacion INT PRIMARY KEY IDENTITY(1,1),
    idUsuario VARCHAR(10),
    idSala INT,
    idExperiencia INT,
    idMesa INT,
    estatus INT,
    horaInicio TIME,
    duracion INT,
    fecha DATE,
    numPersonas INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
    FOREIGN KEY (idSala) REFERENCES Salas(idSala),
    FOREIGN KEY (idExperiencia) REFERENCES Experiencias(idExperiencia),
    FOREIGN KEY (idMesa) REFERENCES Mesas(idMesa),
    FOREIGN KEY (estatus) REFERENCES Estatus(idEstatus)
);

CREATE TABLE ReservacionesMateriales (
    idReservacion INT,
    idMaterial INT,
    cantidad INT,
    estatus INT,
    FOREIGN KEY (idReservacion) REFERENCES Reservaciones(idReservacion),
    FOREIGN KEY (idMaterial) REFERENCES Materiales(idMaterial),
    PRIMARY KEY (idReservacion, idMaterial),
    FOREIGN KEY (estatus) REFERENCES Estatus(idEstatus)
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

-- Sample data for Estatus
INSERT INTO Estatus (nombre, descripcion) VALUES
('Completado','El material ha sido preparado'),
('En progreso', 'El material esta siendo preparado'),
('Confirmada','La reserva ha sido confirmada'),
('Cancelada','La reserva ha sido cancelada'),
('En espera','La solicitud de reserva esta en espera'),
('Denegada','La solicitud de reserva ha sido negada');

-- Sample data for UnidadesFormacion
INSERT INTO UnidadesFormacion (nombre) VALUES 
('Unidad Formación 1'),
('Unidad Formación 2');

-- Sample data for Usuarios
INSERT INTO Usuarios (idUsuario, nombre, apellidoP, apellidoM, tipo, prioridad, logroPrincipal) VALUES
('A01177767', 'Christopher Gabriel', 'Pedraza', 'Pohlenz', 'Regular', 362, 1),
('L00000000', 'Rolando', 'Pérez', '', 'Profesor', 2, 1),
('test', 'test', 'test', 'test', 'Regular', 1, 1);

-- Sample data for Credenciales
INSERT INTO Credenciales (idUsuario, contrasena) VALUES
('A01177767', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2'),
('L00000000', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2'),
('test', 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff');

-- Sample data for GruposUsuarios
INSERT INTO GruposUsuarios (idUF, idUsuario) VALUES
(1, 'A01177767'),
(1, 'test'),
(2, 'L00000000');

-- Sample data for Logros
INSERT INTO Logros (nombre, descripcion, prioridadOtorgada, iconoURL, color, valorMax) VALUES
('Big Dreamer', 'Reserva 50 veces algún espacio del D.R.E.A.M. Lab.', 1, 'https://dreamlabstorage.blob.core.windows.net/logros/BigDreamer.png', '#AFB7FF', 50),
('Independent Learner', 'Completa 20 experiencias autodirigidas.', 1, 'https://dreamlabstorage.blob.core.windows.net/logros/IndependentLearner.png', '#C0A2FF', 20),
('Robot Expert', 'Asiste a 5 eventos dentro del “Electric Garage”.', 1, 'https://dreamlabstorage.blob.core.windows.net/logros/RobotExpert.png', '#78C2F8', 5),
('Testing Champion', 'Reserva y asiste 5 veces a la sala “Testing Land”.', 1, 'https://dreamlabstorage.blob.core.windows.net/logros/TestingChampion.png', '#FF87E5', 5),
('Ancient Soul', 'Reserva y asiste 3 veces a la sala “Graveyard”.', 1, 'https://dreamlabstorage.blob.core.windows.net/logros/AncientSoul.png', '#98A6B6', 3),
('Visionary', 'Reserva y asiste 2 veces a la “Sala VR”.', 1, 'https://dreamlabstorage.blob.core.windows.net/logros/Visionary.png', '#FF6073', 2),
('Priority Achiever', 'Alcanza un puntaje de prioridad de al menos 500 puntos en una ocasión.', 1, 'https://dreamlabstorage.blob.core.windows.net/logros/PriorityAchiever.png', '#F8E478', 500),
('Five-Star Player', 'Forma parte del top 5 de usuarios con mayor prioridad.', 1, 'https://dreamlabstorage.blob.core.windows.net/logros/Trustworthy.png', '#A0DE83', 1),
('Communicator', 'Utiliza 1 vez el sistema de recomendaciones por voz.', 1, 'https://dreamlabstorage.blob.core.windows.net/logros/Communicator.png', '#FEA767', 1);

-- Sample data for UsuariosLogros
INSERT INTO UsuariosLogros (idLogro, idUsuario, valorActual, estatus) VALUES
(1, 'A01177767', 50, 1),
(2, 'A01177767', 5, 0),
(3, 'A01177767', 5, 1),
(4, 'A01177767', 3, 0),
(5, 'A01177767', 3, 1),
(6, 'A01177767', 1, 0),
(7, 'A01177767', 367, 0),
(8, 'A01177767', 1, 1),
(9, 'A01177767', 0, 0),
(1, 'L00000000', 0, 0);

-- Sample data for Materiales
INSERT INTO Materiales (nombre, fotoURL)
VALUES
    ('Laptop Gamer', 'https://dreamlabstorage.blob.core.windows.net/materiales/laptop-gamer.png'),
    ('Surface Pro', 'https://dreamlabstorage.blob.core.windows.net/materiales/surface.png'),
    ('Chromebook', 'https://dreamlabstorage.blob.core.windows.net/materiales/chromebook.png'),
    ('Oculus Quest 2', 'https://dreamlabstorage.blob.core.windows.net/materiales/oculus.png'),
    ('HTC Vive Pro 2', 'https://dreamlabstorage.blob.core.windows.net/materiales/vive.png'),
    ('PlayStation VR', 'https://dreamlabstorage.blob.core.windows.net/materiales/playstationVR.png'),
    ('Visor VR para smartphone', 'https://dreamlabstorage.blob.core.windows.net/materiales/vr-smartphone.png'),
    ('PC de escritorio', 'https://dreamlabstorage.blob.core.windows.net/materiales/pc.png'),
    ('Tablet Android', 'https://dreamlabstorage.blob.core.windows.net/materiales/android-tablet.png'),
    ('Tablet iPad', 'https://dreamlabstorage.blob.core.windows.net/materiales/ipad.png'),
    ('Tablet Windows', 'https://dreamlabstorage.blob.core.windows.net/materiales/tablet-windows.png'),
    ('Cámara Digital (DSLR)', 'https://dreamlabstorage.blob.core.windows.net/materiales/camara.png'),
    ('Audífonos Over-Ear', 'https://dreamlabstorage.blob.core.windows.net/materiales/audifonos.png'),
    ('Altavoces Bluetooth', 'https://dreamlabstorage.blob.core.windows.net/materiales/altavoz.png'),
    ('Micrófono', 'https://dreamlabstorage.blob.core.windows.net/materiales/microfono.png'),
    ('Router Wi-Fi', 'https://dreamlabstorage.blob.core.windows.net/materiales/router.png'),
    ('Cable Ethernet', 'https://dreamlabstorage.blob.core.windows.net/materiales/cable-ethernet.png'),
    ('Tarjeta de Red', 'https://dreamlabstorage.blob.core.windows.net/materiales/tarjeta-red.png');

-- Sample data for Salas
INSERT INTO Salas (nombre, descripcion, cantidadMesas, fotoURL, detallesURL) VALUES
('Electric Garage', 'Este espacio dinámico y versátil es un sueño hecho realidad para los entusiastas de la electrónica. Equipado con las últimas herramientas y tecnologías, es el lugar ideal para dar vida a tus proyectos más ambiciosos.', 8, 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://dreamlabstorage.blob.core.windows.net/archivos/electric-garage.png'),
('Dimension Forge', 'Un laboratorio de vanguardia donde la creatividad se fusiona con la tecnología. Aquí, los innovadores pueden explorar libremente nuevas ideas y experimentar con las últimas herramientas de diseño y fabricación.', 6, 'https://dreamlabstorage.blob.core.windows.net/archivos/vr-lede.jpg', 'https://dreamlabstorage.blob.core.windows.net/archivos/dimension-forge.png'),
('New Horizons', 'Inspirado por la curiosidad y el deseo de explorar lo desconocido, New Horizons es un lugar donde los límites de la tecnología se desdibujan. Desde la inteligencia artificial hasta la exploración espacial, aquí se dan los primeros pasos hacia el futuro.', 7, 'https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://dreamlabstorage.blob.core.windows.net/archivos/new-horizons.png'),
('Deep Net', 'Sumérgete en las profundidades de la seguridad informática y las redes con Deep Net. Equipado con tecnología de última generación y expertos en el campo, es el lugar perfecto para poner a prueba tus habilidades y descubrir nuevos horizontes en el ciberespacio.', 5, 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://dreamlabstorage.blob.core.windows.net/archivos/deep-net.jpg'),
('Graveyard', 'No es un lugar de descanso, sino de reinvención. Graveyard es donde las ideas obsoletas encuentran una nueva vida y las tecnologías pasadas se transforman en innovaciones futuras. Es el punto de partida para los visionarios y los revolucionarios.', 9, 'https://images.unsplash.com/photo-1540829917886-91ab031b1764?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://dreamlabstorage.blob.core.windows.net/archivos/graveyard.png'),
('PCB Factory', 'Desde prototipos hasta producción en masa, PCB Factory ofrece un entorno especializado para el diseño y la fabricación de placas de circuito impreso. Con equipos de alta precisión y experiencia técnica, cada proyecto encuentra su camino hacia el éxito.', 10, 'https://images.unsplash.com/photo-1631376178637-392efc9e356b?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://dreamlabstorage.blob.core.windows.net/archivos/pcb-factory.jpg'),
('Hack-Battlefield', 'Adéntrate en un campo de pruebas donde la habilidad y la estrategia son tus armas. Hack-Battlefield es el lugar donde los expertos en seguridad informática se enfrentan para poner a prueba sus habilidades y proteger los sistemas de mañana.', 6, 'https://images.unsplash.com/photo-1567619363836-e5fd63f69b20?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://dreamlabstorage.blob.core.windows.net/archivos/hack-battlefield.png'),
('Testing Land', 'Un terreno fértil para la innovación y el desarrollo tecnológico. Aquí, los proyectos toman forma y se someten a rigurosas pruebas para garantizar su calidad y fiabilidad. Es el punto de partida para las soluciones del futuro.', 8, 'https://images.unsplash.com/photo-1587355760421-b9de3226a046?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://dreamlabstorage.blob.core.windows.net/archivos/testing-land.jpg'),
('War Headquarters', 'El corazón estratégico de las operaciones tecnológicas avanzadas. War Headquarters es donde se planifican y ejecutan los proyectos más ambiciosos, donde la creatividad se encuentra con la ingeniería para dar forma al futuro de la tecnología.', 5, 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://dreamlabstorage.blob.core.windows.net/archivos/war-headquarters.png'),
('Biometrics Flexible Hall', 'En un mundo donde la identidad es fundamental, Biometrics Flexible Hall ofrece un entorno adaptable para la investigación y el desarrollo de sistemas biométricos. Desde el reconocimiento facial hasta la autenticación de voz, aquí se están construyendo las soluciones de seguridad del mañana.', 7, 'https://images.unsplash.com/photo-1667453466805-75bbf36e8707?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://dreamlabstorage.blob.core.windows.net/archivos/biometrics.jpg'),
('Beyond-Digits', 'Más allá de los límites convencionales de la tecnología, Beyond-Digits es donde las ideas audaces encuentran su hogar. Aquí, los innovadores exploran nuevas fronteras, desde la inteligencia artificial hasta la computación cuántica, dando forma al futuro con cada línea de código.', 9, 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://dreamlabstorage.blob.core.windows.net/archivos/beyond-digits.jpg');

-- Sample data for Experiencias
INSERT INTO Experiencias (idUF, idSala, nombre, descripcion, esAutoDirigida, esExclusivaUF, portadaURL, fechaInicio, fechaFin, horaFin) VALUES
(null, 3, 'Hackers Event', 'Únete a nosotros para explorar los últimos avances en ciberseguridad y pruebas de software en nuestro evento exclusivo. Aprende de expertos de la industria y participa en debates interactivos sobre técnicas y herramientas de hacking ético.', 1, 1, 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2024-01-01', '2024-01-07', '18:00:00'),
(null, 3, 'Cisco Experience', 'Sumérgete en el emocionante mundo de la tecnología de red con Cisco Experience. Descubre las últimas innovaciones de Cisco en networking y colaboración, y obtén conocimientos prácticos para impulsar tu carrera en TI.', 0, 0, 'https://images.unsplash.com/photo-1554098415-4052459dc340?q=80&w=1852&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2024-02-01', '2024-02-07', '20:00:00'),
(null, 1, 'Game jam event', '¡Prepárate para un fin de semana lleno de creatividad y diversión en nuestro evento de Game Jam! Únete a otros desarrolladores para crear juegos originales en un entorno colaborativo y emocionante.', 0, 1, 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?q=80&w=1767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2024-01-03', '2024-01-03', '18:00:00'),
(null, 1, 'Presentación Apple Vision Pro', 'Explora las nuevas características y posibilidades de Apple Vision Pro en nuestra presentación exclusiva. Descubre cómo esta tecnología revolucionaria está transformando la forma en que interactuamos con el mundo que nos rodea.', 0, 1, 'https://images.unsplash.com/photo-1698084068220-856ded06c1a4?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2024-03-01', '2024-03-07', '20:00:00'),
(null, 2, 'Creando tu primer circuito', 'Únete a nuestro taller práctico y aprende los fundamentos de la electrónica mientras creas tu primer circuito. Desde conceptos básicos hasta proyectos prácticos, este evento es perfecto para principiantes que desean explorar el mundo de la electrónica.', 1, 0, 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2024-01-04', '2024-01-05', '18:00:00'),
(null, 2, 'Curso de Swift', 'Sumérgete en el fascinante mundo de la programación iOS con nuestro curso de Swift. Aprende los fundamentos del lenguaje de programación Swift y desarrolla habilidades prácticas para crear aplicaciones innovadoras y emocionantes para dispositivos Apple.', 1, 1, 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2024-01-01', '2024-08-02', '20:00:00'),
(null, 1, 'Experiencia VR', '¡Explora el Mundo Virtual: Un Viaje Educativo en Realidad Virtual! Únete a nosotros en nuestra escuela para una experiencia única donde los estudiantes se sumergirán en la magia de la realidad virtual. Desde viajar a lugares exóticos hasta aventurarse en mundos históricos, cada experiencia ofrecerá una nueva perspectiva y un aprendizaje interactivo.', 1, 1, 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2024-01-01', '2024-08-02', '20:00:00'),
(1, 1, 'Seguridad en la Red', 'Aprende los conceptos básicos y avanzados de la seguridad en redes en nuestro taller interactivo. Desde la configuración de firewalls hasta la detección de intrusiones, este evento te preparará para proteger eficazmente tu red contra amenazas cibernéticas.', 0, 0, 'https://images.unsplash.com/photo-1604090898152-3003bd1ae6df?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2024-01-10', '2024-01-14', '16:00:00'),
(2, 2, 'Taller de Hacking Ético', 'Explora el mundo del hacking ético en nuestro taller especializado. Aprende técnicas avanzadas de penetración, análisis de vulnerabilidades y más, todo de la mano de expertos en seguridad informática.', 0, 0, 'https://images.unsplash.com/photo-1585079542156-2755d9c8a094?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2024-01-20', '2024-01-24', '14:00:00'),
(1, 3, 'Introducción a la Programación en Python', 'Descubre los fundamentos de la programación en Python en nuestro curso introductorio. Desde la sintaxis básica hasta la resolución de problemas prácticos, este evento es perfecto para aquellos que desean iniciarse en el mundo de la programación.', 0, 1, 'https://images.unsplash.com/photo-1660616246653-e2c57d1077b9?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2024-02-05', '2024-02-09', '18:00:00'),
(2, 4, 'Taller de Desarrollo de Aplicaciones Móviles', 'Aprende a desarrollar aplicaciones móviles desde cero en nuestro taller práctico. Convierte tus ideas en aplicaciones funcionales utilizando las últimas herramientas y técnicas de desarrollo de aplicaciones.', 0, 1, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2024-02-15', '2024-02-19', '16:00:00'),
(1, 5, 'Introducción a la Inteligencia Artificial', 'Descubre los conceptos básicos de la inteligencia artificial en nuestro seminario interactivo. Explora aplicaciones prácticas y aprende cómo la IA está transformando diversas industrias en la actualidad.', 0, 0, 'https://images.unsplash.com/photo-1684369175809-f9642140a1bd?q=80&w=1884&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2024-02-25', '2024-03-01', '14:00:00'),
(1, 6, 'Taller de Diseño de Experiencia de Usuario', 'Aprende los principios básicos del diseño de experiencia de usuario en nuestro taller interactivo. Descubre cómo crear interfaces intuitivas y atractivas que mejoren la experiencia del usuario en aplicaciones y sitios web.', 0, 1, 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2024-03-05', '2024-03-09', '12:00:00'),
(1, 7, 'Taller de Desarrollo Web Moderno', 'Sumérgete en el mundo del desarrollo web moderno en nuestro taller intensivo. Aprende las últimas tecnologías y técnicas para crear sitios web dinámicos y responsivos que se destaquen en el panorama digital actual.', 0, 0, 'https://images.unsplash.com/photo-1669023414171-56f0740e34cd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2024-03-15', '2024-03-19', '10:00:00'),
(2, 8, 'Taller de Machine Learning Práctico', 'Descubre cómo aplicar el aprendizaje automático en proyectos del mundo real en nuestro taller práctico. Aprende a entrenar modelos, realizar análisis de datos y desarrollar soluciones inteligentes utilizando algoritmos de machine learning.', 0, 1, 'https://images.unsplash.com/photo-1644325349124-d1756b79dd42?q=80&w=1775&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '2024-03-25', '2024-03-29', '08:00:00');

-- Sample data for Mesas
INSERT INTO Mesas(idSala, cupos) VALUES
(1, 2), (1, 3), (1, 4), (1, 5),
(2, 2), (2, 3), (2, 4), (2, 8),
(3, 2), (3, 3), (3, 4), (3, 6),
(4, 2), (4, 3), (4, 4), (4, 4),
(5, 2), (5, 3), (5, 4), (5, 10),
(6, 2), (6, 3), (6, 4), (6, 8),
(7, 2), (7, 3), (7, 4), (7, 4),
(8, 2), (8, 3), (8, 4), (8, 9),
(9, 2), (9, 3), (9, 4), (9, 8),
(10, 2), (10, 3), (10, 4), (10, 5),
(11, 2), (11, 3), (11, 4), (11, 10);

-- Sample data for Reservaciones
INSERT INTO Reservaciones (idUsuario, idSala, idExperiencia, idMesa, horaInicio, duracion, fecha, numPersonas, estatus) VALUES
('A01177767', 1, 2, 2, '12:00:00', 3, '2024-01-05', 3, 3),
('A01177767', 1, 3, 3, '09:00:00', 2, '2024-02-10', 4, 2),
('A01177767', 1, 1, 4, '15:00:00', 1, '2024-03-15', 5, 4),
('L00000000', 2, 2, 5, '15:00:00', 1, '2024-02-01', 2, 3);

-- Sample data for ReservacionesMateriales
INSERT INTO ReservacionesMateriales (idReservacion, idMaterial, cantidad, estatus) VALUES
(1, 1, 5, 1),
(2, 2, 3, 2);

-- Sample data for MaterialesSalas
INSERT INTO MaterialesSalas (idSala, idMaterial, cantidad) VALUES
(1, 1, 10),  -- Laptop Gamer para Electric Garage (10 unidades)
(1, 2, 2),  -- Surface Pro para Electric Garage (2 unidades)
(1, 3, 3),  -- Chromebook para Electric Garage (3 unidades)
(1, 5, 2),  -- Oculus Quest 2 para Electric Garage (2 unidades)
(1, 6, 1),  -- Visor VR para smartphone para Electric Garage (1 unidad)
(1, 7, 1),  -- PC de escritorio para Electric Garage (1 unidad)
(1, 9, 1),  -- Cámara Digital (DSLR) para Electric Garage (1 unidad)
(1, 10, 1),  -- Tablet iPad para Electric Garage (1 unidad)
(1, 11, 1),  -- Tablet Windows para Electric Garage (1 unidad)
(1, 12, 2),  -- Altavoces Bluetooth para Electric Garage (2 unidades)
(1, 13, 1),  -- Micrófono para Electric Garage (1 unidad)
(1, 14, 1),  -- Router Wi-Fi para Electric Garage (1 unidad)
(1, 15, 1),  -- Cable Ethernet para Electric Garage (1 unidad)
(1, 16, 1),  -- Tarjeta de Red para Electric Garage (1 unidad)
(2, 6, 6),  -- HTC Vive Pro 2 para Dimension Forge (6 unidades)
(2, 7, 2),  -- PlayStation VR para Dimension Forge (2 unidades)
(2, 1, 4),  -- Laptop Gamer para Dimension Forge (4 unidades)
(2, 3, 2),  -- Chromebook para Dimension Forge (2 unidades)
(2, 10, 2),  -- Tablet Android para Dimension Forge (2 unidades)
(2, 12, 1),  -- Tablet iPad para Dimension Forge (1 unidad)
(2, 11, 1),  -- Tablet Windows para Dimension Forge (1 unidad)
(2, 13, 1),  -- Micrófono para Dimension Forge (1 unidad)
(2, 14, 1),  -- Router Wi-Fi para Dimension Forge (1 unidad)
(2, 15, 1),  -- Cable Ethernet para Dimension Forge (1 unidad)
(2, 16, 1),  -- Tarjeta de Red para Dimension Forge (1 unidad)
(3, 5, 3),  -- Oculus Quest 2 para New Horizons (3 unidades)
(3, 6, 2),  -- Visor VR para smartphone para New Horizons (2 unidades)
(3, 7, 2),  -- PC de escritorio para New Horizons (2 unidades)
(3, 9, 3),  -- Cámara Digital (DSLR) para New Horizons (3 unidades)
(3, 10, 2),  -- Tablet Android para New Horizons (2 unidades)
(3, 11, 1),  -- Tablet Windows para New Horizons (1 unidad)
(3, 12, 1),  -- Altavoces Bluetooth para New Horizons (1 unidad)
(3, 13, 1),  -- Micrófono para New Horizons (1 unidad)
(3, 14, 1),  -- Router Wi-Fi para New Horizons (1 unidad)
(3, 15, 1),  -- Cable Ethernet para New Horizons (1 unidad)
(3, 16, 1),  -- Tarjeta de Red para New Horizons (1 unidad)
(4, 1, 6),  -- Laptop Gamer para Deep Net (6 unidades)
(4, 2, 2),  -- Surface Pro para Deep Net (2 unidades)
(4, 3, 2),  -- Chromebook para Deep Net (2 unidades)
(4, 5, 2),  -- Oculus Quest 2 para Deep Net (2 unidades)
(4, 6, 1),  -- Visor VR para smartphone
(4, 7, 1),  -- PC de escritorio para Deep Net (1 unidad)
(4, 9, 1),  -- Cámara Digital (DSLR) para Deep Net (1 unidad)
(4, 12, 1),  -- Tablet iPad para Deep Net (1 unidad)
(4, 11, 1),  -- Tablet Windows para Deep Net (1 unidad)
(4, 13, 1),  -- Micrófono para Deep Net (1 unidad)
(4, 14, 1),  -- Router Wi-Fi para Deep Net (1 unidad)
(4, 15, 1),  -- Cable Ethernet para Deep Net (1 unidad)
(4, 16, 1),  -- Tarjeta de Red para Deep Net (1 unidad)
(5, 2, 5),  -- HTC Vive Pro 2 para Graveyard (5 unidades)
(5, 7, 2),  -- PlayStation VR para Graveyard (2 unidades)
(5, 1, 4),  -- Laptop Gamer para Graveyard (4 unidades)
(5, 3, 1),  -- Chromebook para Graveyard (1 unidad)
(5, 5, 1),  -- Oculus Quest 2 para Graveyard (1 unidad)
(5, 6, 1),  -- Visor VR para smartphone para Graveyard (1 unidad)
(5, 9, 1),  -- Cámara Digital (DSLR) para Graveyard (1 unidad)
(5, 12, 1),  -- Tablet iPad para Graveyard (1 unidad)
(5, 11, 1),  -- Tablet Windows para Graveyard (1 unidad)
(5, 13, 1),  -- Micrófono para Graveyard (1 unidad)
(5, 14, 1),  -- Router Wi-Fi para Graveyard (1 unidad)
(5, 15, 1),  -- Cable Ethernet para Graveyard (1 unidad)
(5, 16, 1),  -- Tarjeta de Red para Graveyard (1 unidad)
(6, 5, 5),  -- Oculus Quest 2 para PCB Factory (5 unidades)
(6, 1, 4),  -- Laptop Gamer para PCB Factory (4 unidades)
(6, 2, 2),  -- Surface Pro para PCB Factory (2 unidades)
(6, 3, 1),  -- Chromebook para PCB Factory (1 unidad)
(6, 6, 1),  -- HTC Vive Pro 2 para PCB Factory (1 unidad)
(6, 7, 1),  -- PlayStation VR para PCB Factory (1 unidad)
(6, 9, 1),  -- Cámara Digital (DSLR) para PCB Factory (1 unidad)
(6, 12, 1),  -- Tablet iPad para PCB Factory (1 unidad)
(6, 11, 1),  -- Tablet Windows para PCB Factory (1 unidad)
(6, 13, 1),  -- Micrófono para PCB Factory (1 unidad)
(6, 14, 1),  -- Router Wi-Fi para PCB Factory (1 unidad)
(6, 15, 1),  -- Cable Ethernet para PCB Factory (1 unidad)
(6, 16, 1),  -- Tarjeta de Red para PCB Factory (1 unidad)
(7, 1, 3),  -- Laptop Gamer para Hack-Battlefield (3 unidades)
(7, 2, 2),  -- Surface Pro para Hack-Battlefield (2 unidades)
(7, 3, 1),  -- Chromebook para Hack-Battlefield (1 unidad)
(7, 6, 2),  -- HTC Vive Pro 2 para Hack-Battlefield (2 unidades)
(7, 7, 2),  -- PlayStation VR para Hack-Battlefield (2 unidades)
(7, 9, 1),  -- Cámara Digital (DSLR) para Hack-Battlefield (1 unidad)
(7, 12, 1),  -- Tablet iPad para Hack-Battlefield (1 unidad)
(7, 11, 1),  -- Tablet Windows para Hack-Battlefield (1 unidad)
(7, 13, 1),  -- Micrófono para Hack-Battlefield (1 unidad)
(7, 14, 1),  -- Router Wi-Fi para Hack-Battlefield (1 unidad)
(7, 15, 1),  -- Cable Ethernet para Hack-Battlefield (1 unidad)
(7, 16, 1),  -- Tarjeta de Red para Hack-Battlefield (1 unidad)
(8, 1, 5),  -- Laptop Gamer para Testing Land (5 unidades)
(8, 2, 2),  -- Surface Pro para Testing Land (2 unidades)
(8, 3, 1),  -- Chromebook para Testing Land (1 unidad)
(8, 5, 2),  -- Oculus Quest 2 para Testing Land (2 unidades)
(8, 6, 2),  -- Visor VR para smartphone para Testing Land (2 unidades)
(8, 7, 1),  -- PC de escritorio para Testing Land (1 unidad)
(8, 9, 1),  -- Cámara Digital (DSLR) para Testing Land (1 unidad)
(8, 12, 1),  -- Tablet iPad para Testing Land (1 unidad)
(8, 11, 1),  -- Tablet Windows para Testing Land (1 unidad)
(8, 13, 1),  -- Micrófono para Testing Land (1 unidad)
(8, 14, 1),  -- Router Wi-Fi para Testing Land (1 unidad)
(8, 15, 1),  -- Cable Ethernet para Testing Land (1 unidad)
(8, 16, 1),  -- Tarjeta de Red para Testing Land (1 unidad)
(9, 1, 7),  -- Laptop Gamer para War Headquarters (7 unidades)
(9, 2, 2),  -- Surface Pro para War Headquarters (2 unidades)
(9, 3, 2),  -- Chromebook para War Headquarters (2 unidades)
(9, 5, 1),  -- Oculus Quest 2 para War Headquarters (1 unidad)
(9, 6, 1),  -- Visor VR para smartphone para War Headquarters (1 unidad)
(9, 7, 1),  -- PC de escritorio para War Headquarters (1 unidad)
(9, 9, 1),  -- Cámara Digital (DSLR) para War Headquarters (1 unidad)
(9, 12, 1),  -- Tablet iPad para War Headquarters (1 unidad)
(9, 11, 1),  -- Tablet Windows para War Headquarters (1 unidad)
(9, 13, 1),  -- Micrófono para War Headquarters (1 unidad)
(9, 14, 1),  -- Router Wi-Fi para War Headquarters (1 unidad)
(9, 15, 1),  -- Cable Ethernet para War Headquarters (1 unidad)
(9, 16, 1),  -- Tarjeta de Red para War Headquarters (1 unidad)
(10, 1, 9),  -- Laptop Gamer para Biometrics Flexible Hall (9 unidades)
(10, 2, 2),  -- Surface Pro para Biometrics Flexible Hall (2 unidades)
(10, 3, 1),  -- Chromebook para Biometrics Flexible Hall (1 unidad)
(10, 5, 1),  -- Oculus Quest 2 para Biometrics Flexible Hall (1 unidad)
(10, 6, 1),  -- Visor VR para smartphone para Biometrics Flexible Hall (1 unidad)
(10, 7, 1),  -- PC de escritorio para Biometrics Flexible Hall (1 unidad)
(10, 9, 2),  -- Cámara Digital (DSLR) para Biometrics Flexible Hall (2 unidades)
(10, 10, 3),  -- Tablet Android para Biometrics Flexible Hall (3 unidades)
(10, 11, 1),  -- Tablet Windows para Biometrics Flexible Hall (1 unidad)
(10, 12, 1),  -- Altavoces Bluetooth para Biometrics Flexible Hall (1 unidad)
(10, 13, 1),  -- Micrófono para Biometrics Flexible Hall (1 unidad)
(10, 14, 1),  -- Router Wi-Fi para Biometrics Flexible Hall (1 unidad)
(10, 15, 1),  -- Cable Ethernet para Biometrics Flexible Hall (1 unidad)
(10, 16, 1),  -- Tarjeta de Red para Biometrics Flexible Hall (1 unidad)
(11, 1, 11),  -- Laptop Gamer para Beyond-Digits (11 unidades)
(11, 2, 2),  -- Surface Pro para Beyond-Digits (2 unidades)
(11, 3, 1),  -- Chromebook para Beyond-Digits (1 unidad)
(11, 5, 2),  -- Oculus Quest 2 para Beyond-Digits (2 unidades)
(11, 6, 1),  -- Visor VR para smartphone para Beyond-Digits (1 unidad)
(11, 7, 1),  -- PC de escritorio para Beyond-Digits (1 unidad)
(11, 9, 1),  -- Cámara Digital (DSLR) para Beyond-Digits (1 unidad)
(11, 10, 2),  -- Tablet Android para Beyond-Digits (2 unidades)
(11, 11, 1),  -- Tablet Windows para Beyond-Digits (1 unidad)
(11, 12, 1),  -- Altavoces Bluetooth para Beyond-Digits (1 unidad)
(11, 13, 1),  -- Micrófono para Beyond-Digits (1 unidad)
(11, 14, 1),  -- Router Wi-Fi para Beyond-Digits (1 unidad)
(11, 15, 1),  -- Cable Ethernet para Beyond-Digits (1 unidad)
(11, 16, 1);  -- Tarjeta de Red para Beyond-Digits (1 unidad)


-- Sample data for MaterialesRecomendados
INSERT INTO MaterialesRecomendados (idExperiencia, idMaterial, cantidad) VALUES
(1, 1, 3),
(2, 2, 4);

