CREATE OR ALTER PROCEDURE getMatRecDisp(
    @idSala INT,
    @fecha DATE,
    @horaInicio TIME(5),
    @duracion INT,
    @idExperiencia INT
)
AS
BEGIN
    -- Obtener los materiales de la sala
    DECLARE @idMaterialesSala TABLE (
        idMaterial INT,
        cantidad INT
    );

    INSERT INTO @idMaterialesSala
    SELECT idMaterial, cantidad
    FROM MaterialesSalas
    WHERE idSala = @idSala;

    -- Obtener las reservas de materiales para la sala, fecha y bloque de tiempo
    DECLARE @idMaterialesReservados TABLE (
        idMaterial INT,
        cantidad INT
    );

    INSERT INTO @idMaterialesReservados
    SELECT rm.idMaterial, rm.cantidad
    FROM Reservaciones r
    JOIN ReservacionesMateriales rm ON r.idReservacion = rm.idReservacion
    JOIN Mesas m ON r.idMesa = m.idMesa
    JOIN Salas s ON m.idSala = s.idSala
    WHERE s.idSala = @idSala
        AND r.fecha = @fecha
        AND r.horaInicio < DATEADD(hour, @duracion, @horaInicio)
        AND DATEADD(hour, r.duracion, r.horaInicio) > @horaInicio;

    -- Obtener los materiales disponibles
    DECLARE @idMaterialesDisponibles TABLE (
        idMaterial INT,
        cantidadDisponible INT
    );

    INSERT INTO @idMaterialesDisponibles
    SELECT
        ms.idMaterial,
        ms.cantidad - ISNULL(SUM(rm.cantidad), 0) AS cantidadDisponible
    FROM @idMaterialesSala ms
    LEFT JOIN @idMaterialesReservados rm ON ms.idMaterial = rm.idMaterial
    GROUP BY ms.idMaterial, ms.cantidad;

    -- Obtener los materiales recomendados para la experiencia
    DECLARE @idMaterialesRecomendados TABLE (
        idMaterial INT,
        cantidadRecomendada INT
    );

    INSERT INTO @idMaterialesRecomendados
    SELECT idMaterial, cantidad AS cantidadRecomendada
    FROM MaterialesRecomendados
    WHERE idExperiencia = @idExperiencia;

    -- Seleccionar los materiales disponibles con su cantidad y añadir los recomendados
    SELECT
        m.idMaterial AS id,
        m.nombre AS name,
        ISNULL(md.cantidadDisponible, 0) AS cantidadDisponible,
        ISNULL(mr.cantidadRecomendada, 0) AS cantidadRecomendada,
        m.fotoURL AS image
    FROM Materiales m
    LEFT JOIN @idMaterialesDisponibles md ON m.idMaterial = md.idMaterial
    LEFT JOIN @idMaterialesRecomendados mr ON m.idMaterial = mr.idMaterial
    WHERE ISNULL(md.cantidadDisponible, 0) > 0 OR ISNULL(mr.cantidadRecomendada, 0) > 0;
END;
GO;
