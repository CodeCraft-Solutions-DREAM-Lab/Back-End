CREATE OR ALTER PROCEDURE getMesasBySalaId
	@idSala INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * 
    FROM [dbo].[Mesas] 
    WHERE idSala = @idSala
END;
GO;