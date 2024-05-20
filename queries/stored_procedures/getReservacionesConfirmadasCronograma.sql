DROP PROCEDURE IF EXISTS getReservacionesConfirmadasCronograma;

CREATE PROCEDURE getReservacionesConfirmadasCronograma
AS
BEGIN
    SELECT 
        R.idReservacion AS id,
        R.idMesa AS [group],
        CONCAT(U.nombre, ' ', U.apellidoP, ' ', U.apellidoM) AS title,
        CAST(CONCAT(CONVERT(VARCHAR, R.fecha, 23), ' ', CONVERT(VARCHAR, R.horaInicio, 8)) AS DATETIME) AS start_time,
        DATEADD(HOUR, R.duracion, CAST(CONCAT(CONVERT(VARCHAR, R.fecha, 23), ' ', CONVERT(VARCHAR, R.horaInicio, 8)) AS DATETIME)) AS end_time
    FROM 
        Reservaciones R
    INNER JOIN 
        Usuarios U ON R.idUsuario = U.idUsuario
    WHERE 
        R.estatus = 3;
END;
