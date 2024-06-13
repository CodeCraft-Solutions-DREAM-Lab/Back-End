CREATE OR ALTER PROCEDURE getPenalizacionesByMes
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        YEAR (fecha) AS year,
        MONTH (fecha) AS month,
        COUNT(idUsuario) AS penalizaciones
    FROM
        HistorialPrioridad
    WHERE
        prioridad < 0
    GROUP BY
        YEAR (fecha),
        MONTH (fecha)
    ORDER BY
        year,
        month;
END;
GO;
