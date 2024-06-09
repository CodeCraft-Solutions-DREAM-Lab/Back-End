CREATE OR ALTER PROCEDURE getReservacionById 
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
        u.idUsuario,
        e.instruccionesURL -- Add the instruccionesURL column
    FROM
        Reservaciones r
        INNER JOIN Salas s ON r.idSala = s.idSala
        INNER JOIN Usuarios u ON r.idUsuario = u.idUsuario
        LEFT JOIN Experiencias e ON r.idExperiencia = e.idExperiencia -- Left join to include Experiencias table
    WHERE
        r.idReservacion = @idReservacion;
END;
GO;
