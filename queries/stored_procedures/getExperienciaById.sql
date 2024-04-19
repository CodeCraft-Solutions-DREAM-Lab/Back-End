CREATE PROCEDURE getExperienciaById
	@idExperiencia INT
AS

    SET NOCOUNT ON;
    SELECT *
    FROM [dbo].[Experiencias]
    WHERE idExperiencia = @idExperiencia;