CREATE OR ALTER PROCEDURE getSalaById
	@idSala INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT *
        FROM [dbo].[Salas]
        WHERE idSala = @idSala;
END;
GO;