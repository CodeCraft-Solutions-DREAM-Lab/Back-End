;
CREATE   PROCEDURE getExperienciasActivas
AS
BEGIN
    SET NOCOUNT ON;

    SELECT e.*
    FROM [dbo].[Experiencias] e
	INNER JOIN [dbo].[Salas] s ON e.idSala = s.idSala
    WHERE s.bloqueada = 0;
END;