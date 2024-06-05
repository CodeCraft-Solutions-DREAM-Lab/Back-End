CREATE
OR
ALTER PROCEDURE getUsoMaterialByMes AS BEGIN
SET
    NOCOUNT ON;

SELECT
    m.nombre AS material,
    DATEPART (YEAR, r.fecha) AS year,
    DATEPART (MONTH, r.fecha) AS month,
    SUM(rm.cantidad) AS uso
FROM
    ReservacionesMateriales rm
    JOIN Materiales m ON rm.idMaterial = m.idMaterial
    JOIN Reservaciones r ON rm.idReservacion = r.idReservacion
GROUP BY
    m.nombre,
    DATEPART (YEAR, r.fecha),
    DATEPART (MONTH, r.fecha)
ORDER BY
    year,
    month,
    material;

END;

GO;