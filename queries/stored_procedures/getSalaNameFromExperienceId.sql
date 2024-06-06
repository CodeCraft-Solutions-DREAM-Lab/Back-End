CREATE OR ALTER PROCEDURE getSalaNameFromExperienceId
	@idExperiencia INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT TOP 1 [dbo].[Salas].nombre
    FROM [dbo].[Salas]
    INNER JOIN [dbo].[Experiencias] 
    ON [dbo].[Experiencias].idSala=[dbo].[Salas].idSala
    AND [dbo].[Experiencias].idExperiencia = @idExperiencia;
END;
GO;