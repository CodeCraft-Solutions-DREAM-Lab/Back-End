DROP PROCEDURE IF EXISTS getPenalizacionesByMes;

GO;

CREATE PROCEDURE getPenalizacionesByMes AS BEGIN
SET
    NOCOUNT ON;

SELECT
    YEAR (fecha) AS Year,
    MONTH (fecha) AS Month,
    COUNT(idUsuario) AS penalizaciones
FROM
    HistorialPrioridad
WHERE
    prioridad < 0
GROUP BY
    YEAR (fecha),
    MONTH (fecha)
ORDER BY
    Year,
    Month;

END;

GO