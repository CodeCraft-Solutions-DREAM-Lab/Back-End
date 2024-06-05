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

DROP TABLE IF EXISTS HistorialPrioridad;

DROP TABLE IF EXISTS GruposUsuarios;

DROP TABLE IF EXISTS Credenciales;

DROP TABLE IF EXISTS Usuarios;

DROP TABLE IF EXISTS UnidadesFormacion;

DROP TABLE IF EXISTS Estatus;

-- CREATE THE TABLES
CREATE TABLE
    UnidadesFormacion (
        idUF INT PRIMARY KEY IDENTITY (1, 1),
        nombre VARCHAR(255)
    );

CREATE TABLE
    Usuarios (
        idUsuario VARCHAR(10) PRIMARY KEY,
        nombre VARCHAR(255),
        apellidoP VARCHAR(255),
        apellidoM VARCHAR(255),
        tipo VARCHAR(50),
        prioridad INT,
        logroPrincipal INT,
        colorPreferido VARCHAR(100)
    );

CREATE TABLE
    Credenciales (
        idUsuario VARCHAR(10),
        contrasena VARCHAR(255),
        tagId VARCHAR(50) FOREIGN KEY (idUsuario) REFERENCES Usuarios (idUsuario)
    );

CREATE TABLE
    GruposUsuarios (
        idUF INT,
        idUsuario VARCHAR(10),
        FOREIGN KEY (idUF) REFERENCES UnidadesFormacion (idUF),
        FOREIGN KEY (idUsuario) REFERENCES Usuarios (idUsuario),
        PRIMARY KEY (idUF, idUsuario)
    );

CREATE TABLE
    HistorialPrioridad (
        idUsuario VARCHAR(10),
        fecha DATE,
        prioridad INT,
        motivo VARCHAR(255),
        FOREIGN KEY (idUsuario) REFERENCES Usuarios (idUsuario),
    );

CREATE TABLE
    Logros (
        idLogro INT PRIMARY KEY IDENTITY (1, 1),
        nombre VARCHAR(255),
        descripcion VARCHAR(500),
        prioridadOtorgada INT,
        iconoURL VARCHAR(255),
        color VARCHAR(100),
        valorMax INT
    );

CREATE TABLE
    UsuariosLogros (
        idLogro INT,
        idUsuario VARCHAR(10),
        valorActual INT,
        obtenido BIT,
        FOREIGN KEY (idLogro) REFERENCES Logros (idLogro),
        FOREIGN KEY (idUsuario) REFERENCES Usuarios (idUsuario),
        PRIMARY KEY (idLogro, idUsuario)
    );

CREATE TABLE
    Materiales (
        idMaterial INT PRIMARY KEY IDENTITY (1, 1),
        nombre VARCHAR(255),
        fotoURL VARCHAR(255)
    );

CREATE TABLE
    Salas (
        idSala INT PRIMARY KEY IDENTITY (1, 1),
        nombre VARCHAR(255),
        cantidadMesas INT,
        descripcion VARCHAR(500),
        fotoURL VARCHAR(255),
        detallesURL VARCHAR(255),
        bloqueada BIT
    );

CREATE TABLE
    Mesas (
        idMesa INT PRIMARY KEY IDENTITY (1, 1),
        idSala INT,
        cupos INT,
        FOREIGN KEY (idSala) REFERENCES Salas (idSala)
    );

CREATE TABLE
    Experiencias (
        idExperiencia INT PRIMARY KEY IDENTITY (1, 1),
        idUF INT,
        idSala INT,
        nombre VARCHAR(255),
        descripcion VARCHAR(500),
        esAutoDirigida BIT,
        esExclusivaUF BIT,
        portadaURL VARCHAR(255),
        fechaInicio DATE,
        fechaFin DATE,
        instruccionesIRL VARCHAR(255),
        horaFin TIME,
        FOREIGN KEY (idUF) REFERENCES UnidadesFormacion (idUF),
        FOREIGN KEY (idSala) REFERENCES Salas (idSala)
    );

CREATE TABLE
    Estatus (
        idEstatus INT PRIMARY KEY IDENTITY (1, 1),
        nombre VARCHAR(50),
        descripcion VARCHAR(100)
    );

CREATE TABLE
    Reservaciones (
        idReservacion INT PRIMARY KEY IDENTITY (1, 1),
        idUsuario VARCHAR(10),
        idSala INT,
        idExperiencia INT,
        idMesa INT,
        estatus INT,
        estatusMateriales INT,
        horaInicio TIME,
        duracion INT,
        fecha DATE,
        numPersonas INT,
        asistencia VARCHAR(50),
        nombreAlterno VARCHAR(255),
        FOREIGN KEY (idUsuario) REFERENCES Usuarios (idUsuario),
        FOREIGN KEY (idSala) REFERENCES Salas (idSala),
        FOREIGN KEY (idExperiencia) REFERENCES Experiencias (idExperiencia),
        FOREIGN KEY (idMesa) REFERENCES Mesas (idMesa),
        FOREIGN KEY (estatus) REFERENCES Estatus (idEstatus),
        FOREIGN KEY (estatusMateriales) REFERENCES Estatus (idEstatus)
    );

CREATE TABLE
    ReservacionesMateriales (
        idReservacion INT,
        idMaterial INT,
        cantidad INT,
        estatus INT,
        FOREIGN KEY (idReservacion) REFERENCES Reservaciones (idReservacion),
        FOREIGN KEY (idMaterial) REFERENCES Materiales (idMaterial),
        PRIMARY KEY (idReservacion, idMaterial),
        FOREIGN KEY (estatus) REFERENCES Estatus (idEstatus)
    );

CREATE TABLE
    MaterialesSalas (
        idSala INT,
        idMaterial INT,
        cantidad INT,
        FOREIGN KEY (idSala) REFERENCES Salas (idSala),
        FOREIGN KEY (idMaterial) REFERENCES Materiales (idMaterial),
        PRIMARY KEY (idSala, idMaterial)
    );

CREATE TABLE
    MaterialesRecomendados (
        idExperiencia INT,
        idMaterial INT,
        cantidad INT,
        FOREIGN KEY (idExperiencia) REFERENCES Experiencias (idExperiencia),
        FOREIGN KEY (idMaterial) REFERENCES Materiales (idMaterial),
        PRIMARY KEY (idExperiencia, idMaterial)
    );