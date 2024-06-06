CREATE OR ALTER PROCEDURE getExperienciaById
	@idExperiencia INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT *
    FROM [dbo].[Experiencias]
    WHERE idExperiencia = @idExperiencia;
END;
GO;
