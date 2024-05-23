DROP PROCEDURE IF EXISTS getReservacionesByMes;

GO CREATE PROCEDURE getReservacionesByMes AS BEGIN
SET
    NOCOUNT ON;

SELECT
    DATEPART (YEAR, fecha) AS year,
    DATEPART (MONTH, fecha) AS month,
    COUNT(*) AS reservacionesTotales,
    SUM(
        CASE
            WHEN estatus = 3 THEN 1
            ELSE 0
        END
    ) AS reservacionesConfirmadas,
    SUM(
        CASE
            WHEN estatus = 4 THEN 1
            ELSE 0
        END
    ) AS reservacionesCanceladas,
    SUM(
        CASE
            WHEN estatus = 5 THEN 1
            ELSE 0
        END
    ) AS reservacionesEnEspera,
    SUM(
        CASE
            WHEN estatus = 6 THEN 1
            ELSE 0
        END
    ) AS reservacionesDenegadas
FROM
    Reservaciones
GROUP BY
    DATEPART (YEAR, fecha),
    DATEPART (MONTH, fecha)
ORDER BY
    year,
    month;

END