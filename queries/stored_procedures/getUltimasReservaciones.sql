CREATE PROCEDURE getUltimasReservaciones
    @idUsuario varchar(10)
AS
BEGIN
    SET NOCOUNT ON;

	SELECT TOP 5 r.idSala, r.idExperiencia, s.nombre AS nombreSala, s.fotoURL, s.detallesURL, e.nombre AS nombreExperiencia, e.portadaURL
	FROM [dbo].[Reservaciones] r
	LEFT JOIN [dbo].[Salas] s ON r.idSala = s.idSala
    LEFT JOIN [dbo].[Experiencias] e ON r.idExperiencia = e.idExperiencia
    WHERE r.idUsuario = @idUsuario
	ORDER BY r.fecha ASC;

END;