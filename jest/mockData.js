export const mockExperiencia = {
    idExperiencia: 1,
    idUF: 1,
    idSala: 1,
    nombre: "string",
    descripcion: "string",
    esAutoDirigida: true,
    esExclusivaUF: true,
    portadaURL: "string",
    fechaInicio: "2024-05-26T01:32:34.577Z",
    fechaFin: "2024-05-26T01:32:34.577Z",
    horaFin: "2024-05-26T01:32:34.577Z",
};

export const mockExperiencias = [mockExperiencia];

export const mockGrupos = [{ idUsuario: "test", idUF: 1 }];

export const mockError = { error: "Database error" };

export const mockReservacionesByMes = [
    {
        year: 0,
        month: 0,
        reservacionesTotales: 0,
        reservacionesConfirmadas: 0,
        reservacionesCanceladas: 0,
        reservacionesEnEspera: 0,
        reservacionesDenegadas: 0,
    },
];

export const mockReservacionesBySalaByMes = [
    {
        year: 0,
        month: 0,
        salas: [{}],
    },
];

export const mockSalasDisponibles = [
    {
        sala: "Electric Garage",
        bloqueada: false,
    },
];

export const mockUsoMaterialByMes = [
    {
        year: 0,
        month: 0,
        materiales: [{}],
    },
];

export const mockPenalizacionesByMes = [
    {
        year: 0,
        month: 0,
        penalizaciones: 0,
    },
];

export const mockUpdateLogro = {
    idLogro: 0,
    valorActual: 0,
    obtenido: true,
};

export const mockReservacion = {
    idReservacion: 0,
    idUsuario: "string",
    idSala: 0,
    idExperiencia: 0,
    idMesa: 0,
    horaInicio: "2024-05-26T07:23:12.552Z",
    duracion: 0,
    fecha: "2024-05-26T07:23:12.552Z",
    numPersonas: 0,
};

export const mockReservaciones = [mockReservacion];

export const mockRowsAffected = {
    rowsAffected: {},
};

export const mockRowsAffectedReservaciones = {
    rowsAffected: {
        idUsuario: expect.any(String),
        idSala: expect.any(Number),
        idExperiencia: expect.any(Number),
        idMesa: expect.any(Number),
        horaInicio: expect.any(String),
        duracion: expect.any(Number),
        fecha: expect.any(String),
        numPersonas: expect.any(Number),
        idReservacion: expect.any(Number),
    },
};

export const mockCronograma = [
    {
        id: 0,
        group: 0,
        title: "string",
        start_time: "2024-05-26T07:41:29.345Z",
        end_time: "2024-05-26T07:41:29.345Z",
    },
];

export const mockUsuario = {
    idUsuario: "string",
    nombre: "string",
    apellidoP: "string",
    apellidoM: "string",
    tipo: "string",
    prioridad: 0,
};

export const mockUsuarios = [mockUsuario];

export const mockRowsAffectedUsuarios = {
    rowsAffected: {
        idUsuario: expect.any(String),
        nombre: expect.any(String),
        apellidoP: expect.any(String),
        apellidoM: expect.any(String),
        tipo: expect.any(String),
        prioridad: expect.any(Number),
    },
};

export const mockUsuarioPrioridad = {
    idUsuario: "a00833173",
    puntos: 10,
    motivo: "string",
};

export const mockMessageResponse = {
    message: expect.any(String),
};
