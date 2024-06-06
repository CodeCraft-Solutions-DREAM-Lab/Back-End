CREATE OR ALTER PROCEDURE getMesasFromSalaByCupo
	@idSala INT,
    @cupos INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * 
    FROM [dbo].[Mesas] 
    WHERE idSala = @idSala
    AND cupos >= @cupos;
END;
GO;