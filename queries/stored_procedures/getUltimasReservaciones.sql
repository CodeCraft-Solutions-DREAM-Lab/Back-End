CREATE OR ALTER PROCEDURE getUltimasReservaciones
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
    ),
    SalasUnicas AS (
        SELECT DISTINCT 
            null AS idExperiencia, 
            s.idSala, 
            s.nombre, 
            s.fotoURL AS URL, 
            'sala' AS tipo
        FROM UltimasReservaciones ur
        JOIN [dbo].[Salas] s ON ur.idSala = s.idSala
    ),
    ExperienciasUnicas AS (
        SELECT DISTINCT 
            e.idExperiencia, 
            e.idSala, 
            e.nombre, 
            e.portadaURL AS URL, 
            'experiencia' AS tipo
        FROM UltimasReservaciones ur
        JOIN [dbo].[Experiencias] e ON ur.idExperiencia = e.idExperiencia
        WHERE ur.idExperiencia IS NOT NULL
    ),
    ExperienciasUFs AS (
        SELECT 
            E.idExperiencia, 
            E.idSala, 
            E.nombre, 
            E.portadaURL AS URL, 
            'experiencia' AS tipo
        FROM Experiencias E
        WHERE E.idUF IN (
            SELECT DISTINCT GU.idUF
            FROM GruposUsuarios GU
            WHERE GU.idUsuario = @idUsuario
        )
    ),
    ExperienciasPopulares AS (
        SELECT TOP 6
            E.idExperiencia,
            E.idSala,
            E.nombre,
            E.portadaURL AS URL,
            'experiencia' AS tipo,
            COUNT(R.idReservacion) AS cantidadReservas
        FROM 
            Experiencias E
        JOIN 
            Reservaciones R ON E.idExperiencia = R.idExperiencia
        GROUP BY  
            E.idExperiencia, E.idSala, E.nombre, E.portadaURL
        ORDER BY 
            COUNT(R.idReservacion) DESC
    )

    -- Union de todas las consultas
    SELECT idExperiencia, idSala, nombre, URL, tipo FROM SalasUnicas

    UNION

    SELECT idExperiencia, idSala, nombre, URL, tipo FROM ExperienciasUnicas

    UNION

    SELECT idExperiencia, idSala, nombre, URL, tipo FROM ExperienciasUFs

    UNION

    SELECT idExperiencia, idSala, nombre, URL, tipo FROM (
        SELECT idExperiencia, idSala, nombre, URL, tipo
        FROM ExperienciasPopulares
    ) AS Populares;

END;
GO;