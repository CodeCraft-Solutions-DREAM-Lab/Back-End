DROP PROCEDURE IF EXISTS getReservacionById;
GO

CREATE PROCEDURE getReservacionById 
    @idReservacion INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        r.idReservacion,
        CONCAT (u.nombre, ' ', u.apellidoP, ' ', u.apellidoM) AS nombre_usuario,
        s.nombre AS nombre_sala,
        r.idSala,
        r.horaInicio,
        r.duracion,
        r.fecha,
        r.idMesa, 
        r.numPersonas,
        u.idUsuario
    FROM
        Reservaciones r
        INNER JOIN Salas s ON r.idSala = s.idSala
        INNER JOIN Usuarios u ON r.idUsuario = u.idUsuario
    WHERE
        r.idReservacion = @idReservacion;
END