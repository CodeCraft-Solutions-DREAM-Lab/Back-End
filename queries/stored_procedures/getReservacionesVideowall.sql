DROP PROCEDURE IF EXISTS getReservacionesVideowall;
GO

CREATE PROCEDURE getReservacionesVideowall 
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @estatus INT = 3;

    -- Get the current date in GMT-6
    DECLARE @currentDate DATE = CONVERT(date, DATEADD(HOUR, -6, GETUTCDATE()));

    -- Get the current time in GMT-6
    DECLARE @currentTime TIME = CAST(DATEADD(HOUR, -6, GETUTCDATE()) AS TIME);

    SELECT
        r.idReservacion,
        CONCAT(u.nombre, ' ', u.apellidoP, ' ', u.apellidoM) AS nombre_usuario,
        s.nombre AS nombre_sala,
        r.horaInicio,
        r.duracion,
        r.fecha,
        l.iconoURL,
        u.colorPreferido
    FROM
        Reservaciones r
        INNER JOIN Salas s ON r.idSala = s.idSala
        INNER JOIN Usuarios u ON r.idUsuario = u.idUsuario
        INNER JOIN Logros l ON u.logroPrincipal = l.idLogro
    WHERE
        r.estatus = @estatus
        AND r.fecha = @currentDate
        AND DATEADD(HOUR, r.duracion, r.horaInicio) > @currentTime
        AND r.horaInicio <= @currentTime
	ORDER BY
        r.horaInicio,
		DATEADD(HOUR, r.duracion, r.horaInicio);
END