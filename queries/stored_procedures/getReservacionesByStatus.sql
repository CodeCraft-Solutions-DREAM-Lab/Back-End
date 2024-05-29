DROP PROCEDURE IF EXISTS getReservacionesByStatus;
GO

CREATE PROCEDURE getReservacionesByStatus 
    @estatus INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        r.idReservacion,
        CONCAT (u.nombre, ' ', u.apellidoP, ' ', u.apellidoM) AS nombre_usuario,
        s.nombre AS nombre_sala,
        r.idSala, -- Incluir ID de sala para aplicarse en lógica de asignación de mesas
        r.horaInicio,
        r.duracion,
        r.fecha,
        r.idMesa, -- Incluir mesa asignada
        r.numPersonas, -- Incluir cantidad de personas
        l.iconoURL,
        u.colorPreferido,
        u.prioridad  -- Incluir puntos de prioridad
    FROM
        Reservaciones r
        INNER JOIN Salas s ON r.idSala = s.idSala
        INNER JOIN Usuarios u ON r.idUsuario = u.idUsuario
        INNER JOIN Logros l ON u.logroPrincipal = l.idLogro
    WHERE
        r.estatus = @estatus;
END