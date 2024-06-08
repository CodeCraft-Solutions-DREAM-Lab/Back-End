CREATE OR ALTER PROCEDURE getReservacionesBySalaByMes
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        s.nombre AS name,
        DATEPART (YEAR, r.fecha) AS year,
        DATEPART (MONTH, r.fecha) AS month,
        COUNT(r.idReservacion) AS value
    FROM
        Reservaciones r
        JOIN Salas s ON r.idSala = s.idSala
    GROUP BY
        s.nombre,
        DATEPART (YEAR, r.fecha),
        DATEPART (MONTH, r.fecha)
    ORDER BY
        year,
        month,
        name;
END;
GO;