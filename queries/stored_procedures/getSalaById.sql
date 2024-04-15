CREATE PROCEDURE getSalaById
	@idSala INT
AS

    SET NOCOUNT ON;
    SELECT *
    FROM [dbo].[Salas]
    WHERE idSala = @idSala;