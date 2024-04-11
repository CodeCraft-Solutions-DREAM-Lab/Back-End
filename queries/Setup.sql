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
    idUF INT PRIMARY KEY IDENTITY(1,1),
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
    idMaterial INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255),
    fotoURL VARCHAR(255)
);

CREATE TABLE Salas (
    idSala INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255),
    descripcion VARCHAR(500),
    cantidadMesas INT,
    fotoURL VARCHAR(255), -- Remove the comma here
    detallesURL VARCHAR(255)
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

CREATE TABLE Reservaciones (
    idReservacion INT PRIMARY KEY IDENTITY(1,1),
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
INSERT INTO UnidadesFormacion (nombre) VALUES 
('Unidad Formación 1'),
('Unidad Formación 2');

-- Sample data for Usuarios
INSERT INTO Usuarios (idUsuario, nombre, apellidoP, apellidoM, tipo, prioridad) VALUES
('A01177767', 'Christopher Gabriel', 'Pedraza', 'Pohlenz', 'Regular', 1),
('L00000000', 'Rolando', 'Pérez', '', 'Profesor', 2),
('test', 'test', 'test', 'test', 'Regular', 1);

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
INSERT INTO Logros (nombre, descripcion, prioridadOtorgada) VALUES
('Logro 1', 'Descripción logro 1', 1),
('Logro 2', 'Descripción logro 2', 2);

-- Sample data for UsuariosLogros
INSERT INTO UsuariosLogros (idLogro, idUsuario, estatus) VALUES
(1, 'A01177767', 'Activo'),
(2, 'L00000000', 'Inactivo');

-- Sample data for Materiales
INSERT INTO Materiales (nombre, fotoURL) VALUES
('Material 1', 'url_material_1'),
('Material 2', 'url_material_2');

-- Sample data for Salas
INSERT INTO Salas (nombre, descripcion, cantidadMesas, fotoURL, detallesURL) VALUES
('Electric Garage', 'Este espacio dinámico y versátil es un sueño hecho realidad para los entusiastas de la electrónica. Equipado con las últimas herramientas y tecnologías, es el lugar ideal para dar vida a tus proyectos más ambiciosos.', 8, 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'electricgaragefoto'),
('Dimension Forge', 'Un laboratorio de vanguardia donde la creatividad se fusiona con la tecnología. Aquí, los innovadores pueden explorar libremente nuevas ideas y experimentar con las últimas herramientas de diseño y fabricación.', 6, 'https://dreamlabstorage.blob.core.windows.net/archivos/vr-lede.jpg', 'electricgaragefoto'),
('New Horizons', 'Inspirado por la curiosidad y el deseo de explorar lo desconocido, New Horizons es un lugar donde los límites de la tecnología se desdibujan. Desde la inteligencia artificial hasta la exploración espacial, aquí se dan los primeros pasos hacia el futuro.', 7, 'https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'electricgaragefoto'),
('Deep Net', 'Sumérgete en las profundidades de la seguridad informática y las redes con Deep Net. Equipado con tecnología de última generación y expertos en el campo, es el lugar perfecto para poner a prueba tus habilidades y descubrir nuevos horizontes en el ciberespacio.', 5, 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'electricgaragefoto'),
('Graveyard', 'No es un lugar de descanso, sino de reinvención. Graveyard es donde las ideas obsoletas encuentran una nueva vida y las tecnologías pasadas se transforman en innovaciones futuras. Es el punto de partida para los visionarios y los revolucionarios.', 9, 'https://images.unsplash.com/photo-1540829917886-91ab031b1764?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'electricgaragefoto'),
('PCB Factory', 'Desde prototipos hasta producción en masa, PCB Factory ofrece un entorno especializado para el diseño y la fabricación de placas de circuito impreso. Con equipos de alta precisión y experiencia técnica, cada proyecto encuentra su camino hacia el éxito.', 10, 'https://images.unsplash.com/photo-1631376178637-392efc9e356b?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'electricgaragefoto'),
('Hack-Battlefield', 'Adéntrate en un campo de pruebas donde la habilidad y la estrategia son tus armas. Hack-Battlefield es el lugar donde los expertos en seguridad informática se enfrentan para poner a prueba sus habilidades y proteger los sistemas de mañana.', 6, 'https://images.unsplash.com/photo-1567619363836-e5fd63f69b20?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'electricgaragefoto'),
('Testing Land', 'Un terreno fértil para la innovación y el desarrollo tecnológico. Aquí, los proyectos toman forma y se someten a rigurosas pruebas para garantizar su calidad y fiabilidad. Es el punto de partida para las soluciones del futuro.', 8, 'https://images.unsplash.com/photo-1587355760421-b9de3226a046?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'electricgaragefoto'),
('War Headquarters', 'El corazón estratégico de las operaciones tecnológicas avanzadas. War Headquarters es donde se planifican y ejecutan los proyectos más ambiciosos, donde la creatividad se encuentra con la ingeniería para dar forma al futuro de la tecnología.', 5, 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'electricgaragefoto'),
('Biometrics Flexible Hall', 'En un mundo donde la identidad es fundamental, Biometrics Flexible Hall ofrece un entorno adaptable para la investigación y el desarrollo de sistemas biométricos. Desde el reconocimiento facial hasta la autenticación de voz, aquí se están construyendo las soluciones de seguridad del mañana.', 7, 'https://images.unsplash.com/photo-1667453466805-75bbf36e8707?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'electricgaragefoto'),
('Beyond-Digits', 'Más allá de los límites convencionales de la tecnología, Beyond-Digits es donde las ideas audaces encuentran su hogar. Aquí, los innovadores exploran nuevas fronteras, desde la inteligencia artificial hasta la computación cuántica, dando forma al futuro con cada línea de código.', 9, 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'electricgaragefoto');

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

-- Sample data for Reservaciones
INSERT INTO Reservaciones (idUsuario, idSala, idExperiencia, horaInicio, duracion, fecha, numMesa) VALUES
('A01177767', 1, 1, '10:00:00', 2.5, '2024-01-01', 2),
('L00000000', 2, 2, '15:00:00', 1.5, '2024-02-01', 1);

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
