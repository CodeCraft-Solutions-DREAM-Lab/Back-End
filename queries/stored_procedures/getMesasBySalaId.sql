CREATE PROCEDURE getMesasBySalaId
	@idSala INT
AS
    SET NOCOUNT ON;
    SELECT * 
    FROM [dbo].[Mesas] 
    WHERE idSala = @idSala
