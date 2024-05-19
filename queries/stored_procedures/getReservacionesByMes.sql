DROP PROCEDURE IF EXISTS getReservacionesByMes;

GO CREATE PROCEDURE getReservacionesByMes AS BEGIN
SET
    NOCOUNT ON;

SELECT
    DATEPART (YEAR, fecha) AS 'Año',
    DATEPART (MONTH, fecha) AS 'Mes',
    COUNT(*) AS ReservacionesTotales,
    SUM(
        CASE
            WHEN estatus = 3 THEN 1
            ELSE 0
        END
    ) AS ReservacionesConfirmadas,
    SUM(
        CASE
            WHEN estatus = 4 THEN 1
            ELSE 0
        END
    ) AS ReservacionesCanceladas,
    SUM(
        CASE
            WHEN estatus = 5 THEN 1
            ELSE 0
        END
    ) AS ReservacionesEnEspera,
    SUM(
        CASE
            WHEN estatus = 6 THEN 1
            ELSE 0
        END
    ) AS ReservacionesDenegadas
FROM
    Reservaciones
GROUP BY
    DATEPART (YEAR, fecha),
    DATEPART (MONTH, fecha)
ORDER BY
    'Año',
    'Mes';

END