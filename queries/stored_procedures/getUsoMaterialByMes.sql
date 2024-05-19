DROP PROCEDURE IF EXISTS getUsoMaterialByMes;
GO

CREATE PROCEDURE getUsoMaterialByMes
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @cols AS NVARCHAR(MAX);
    DECLARE @query AS NVARCHAR(MAX);

    -- Get the list of material names
    SELECT @cols = STRING_AGG(QUOTENAME(nombre), ', ')
    FROM Materiales;

    -- Construct the dynamic SQL query
    SET @query = '
    SELECT 
        Year,
        Month, ' + @cols + '
    FROM 
    (
        SELECT 
            m.nombre AS MaterialName,
            DATEPART(YEAR, r.fecha) AS Year,
            DATEPART(MONTH, r.fecha) AS Month,
            rm.cantidad
        FROM 
            ReservacionesMateriales rm
        JOIN 
            Materiales m ON rm.idMaterial = m.idMaterial
        JOIN 
            Reservaciones r ON rm.idReservacion = r.idReservacion
    ) src
    PIVOT
    (
        SUM(cantidad)
        FOR MaterialName IN (' + @cols + ')
    ) pvt
    ORDER BY 
        Year,
        Month;';

    -- Execute the dynamic SQL query
    EXEC sp_executesql @query;
END;
GO
