;
CREATE OR ALTER PROCEDURE getRecomendaciones
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
    SalasUnicas AS (    -- Toma las salas unicas de las ultimas reservaciones
        SELECT DISTINCT 
            null AS idExperiencia, 
            s.idSala, 
            s.nombre, 
            s.fotoURL AS URL, 
            'sala' AS tipo
        FROM UltimasReservaciones ur
        JOIN [dbo].[Salas] s ON ur.idSala = s.idSala
    ),
    ExperienciasUnicas AS (    -- Toma las experiencias unicas de las ultimas reservaciones
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
    ExperienciasUFs AS (    -- Toma las experiencias de las UFs del usuario
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
    ExperienciasPopulares AS (    -- Toma las experiencias mas populares
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

    SELECT idExperiencia, idSala, nombre, URL, tipo FROM ExperienciasPopulares AS Populares;

END;
GO;