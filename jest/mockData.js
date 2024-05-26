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
