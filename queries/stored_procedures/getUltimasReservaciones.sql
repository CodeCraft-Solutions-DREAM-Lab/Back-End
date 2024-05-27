DROP PROCEDURE IF EXISTS getUltimasReservaciones;

CREATE PROCEDURE getUltimasReservaciones
    @idUsuario varchar(10)
AS
BEGIN
    SET NOCOUNT ON;

    -- Seleccionar las últimas 5 reservaciones cronológicamente
    WITH UltimasReservaciones AS (
        SELECT TOP 5 r.idReservacion, r.idSala, r.idExperiencia, r.fecha
        FROM [dbo].[Reservaciones] r
        WHERE r.idUsuario = @idUsuario
        ORDER BY r.fecha DESC
    )

	-- Seleccionar salas únicas
    SELECT DISTINCT null AS 'idExperiencia', s.idSala, s.nombre, s.fotoURL AS 'URL', 'sala' AS tipo
    FROM UltimasReservaciones ur
    JOIN [dbo].[Salas] s ON ur.idSala = s.idSala

	UNION

    -- Seleccionar experiencias únicas
    SELECT DISTINCT e.idExperiencia, e.idSala, e.nombre, e.portadaURL AS 'URL', 'experiencia' AS tipo
    FROM UltimasReservaciones ur
    JOIN [dbo].[Experiencias] e ON ur.idExperiencia = e.idExperiencia
    WHERE ur.idExperiencia IS NOT NULL 

	UNION 

	-- Seleccionar Experiencias UFs
	SELECT E.idExperiencia, E.idSala, E.nombre, E.portadaURL AS 'URL', 'experiencia' AS tipo
    FROM Experiencias E
    WHERE E.idUF IN (
        SELECT DISTINCT GU.idUF
        FROM GruposUsuarios GU
        WHERE GU.idUsuario = 'a00833852'
    );

END;