DROP PROCEDURE IF EXISTS getReservacionesBySalaByMes;
GO

CREATE PROCEDURE getReservacionesBySalaByMes
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @cols AS NVARCHAR(MAX);
    DECLARE @query AS NVARCHAR(MAX);

    -- Get the list of room names
    SELECT @cols = STRING_AGG(QUOTENAME(nombre), ', ')
    FROM Salas;

    -- Construct the dynamic SQL query
    SET @query = '
    SELECT 
        Year,
        Month, ' + @cols + '
    FROM 
    (
        SELECT 
            s.nombre AS RoomName,
            DATEPART(YEAR, r.fecha) AS Year,
            DATEPART(MONTH, r.fecha) AS Month,
            COUNT(r.idReservacion) AS ReservationCount
        FROM 
            Reservaciones r
        JOIN 
            Salas s ON r.idSala = s.idSala
        GROUP BY 
            s.nombre,
            DATEPART(YEAR, r.fecha),
            DATEPART(MONTH, r.fecha)
    ) src
    PIVOT
    (
        SUM(ReservationCount)
        FOR RoomName IN (' + @cols + ')
    ) pvt
    ORDER BY 
        Year,
        Month;';

    -- Execute the dynamic SQL query
    EXEC sp_executesql @query;
END;
GO
