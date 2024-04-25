CREATE PROCEDURE getReservacionesByStatus 
    @estatus INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        r.idReservacion,
        CONCAT (u.nombre, ' ', u.apellidoP, ' ', u.apellidoM) AS nombre_usuario,
        S.nombre AS nombre_sala,
        r.horaInicio,
        r.duracion,
        r.fecha,
        l.iconoURL
    FROM
        Reservaciones r
        INNER JOIN Salas s ON r.idSala = s.idSala
        INNER JOIN Usuarios u ON r.idUsuario = u.idUsuario
        INNER JOIN Logros l ON u.logroPrincipal = l.idLogro
    WHERE
        r.estatus = @estatus;
END