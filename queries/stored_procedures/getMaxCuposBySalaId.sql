CREATE OR ALTER PROCEDURE getMaxCuposBySalaId
    @idSala INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT MAX(cupos) AS maxCupos
    FROM [dbo].[Mesas]
    WHERE idSala = @idSala;
END;
GO;