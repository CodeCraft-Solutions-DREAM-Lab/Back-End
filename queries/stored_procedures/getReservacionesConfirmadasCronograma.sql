CREATE PROCEDURE getReservacionesConfirmadasCronograma
AS
BEGIN
    SELECT 
        R.idReservacion AS id,
        R.idMesa AS [group],
        R.estatus AS estatus,
        CONCAT(U.nombre, ' ', U.apellidoP, ' ', U.apellidoM) AS title,
        CAST(CONCAT(CONVERT(VARCHAR, R.fecha, 23), ' ', CONVERT(VARCHAR, R.horaInicio, 8)) AS DATETIME) AS start_time,
        DATEADD(HOUR, R.duracion, CAST(CONCAT(CONVERT(VARCHAR, R.fecha, 23), ' ', CONVERT(VARCHAR, R.horaInicio, 8)) AS DATETIME)) AS end_time
    FROM 
        Reservaciones R
    INNER JOIN 
        Usuarios U ON R.idUsuario = U.idUsuario
    WHERE 
        R.estatus = 3 OR R.estatus = 2 OR R.estatus = 1 OR R.estatus = 7;
END;
