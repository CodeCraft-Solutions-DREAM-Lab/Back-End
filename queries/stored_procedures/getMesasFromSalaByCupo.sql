CREATE PROCEDURE getMesasFromSalaByCupo
	@idSala INT,
    @cupos INT
AS
    SET NOCOUNT ON;
    SELECT * 
    FROM [dbo].[Mesas] 
    WHERE idSala = @idSala
    AND cupos >= @cupos;
