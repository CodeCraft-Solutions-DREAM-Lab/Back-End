CREATE PROCEDURE getMaterialesDisponibles(
    @idSala INT,
    @fecha DATE,
    @horaInicio TIME(5),
    @duracion INT
)
AS
    -- Obtener los materiales de la sala
    DECLARE @idMaterialesSala TABLE (
        idMaterial INT
    );

    INSERT INTO @idMaterialesSala
    SELECT idMaterial
    FROM MaterialesSalas
    WHERE idSala = @idSala;

    -- Obtener las reservas de materiales para la sala, fecha y bloque de tiempo
    DECLARE @idMaterialesReservados TABLE (
        idMaterial INT
    );

    INSERT INTO @idMaterialesReservados
    SELECT rm.idMaterial
    FROM Reservaciones r
    JOIN ReservacionesMateriales rm ON r.idReservacion = rm.idReservacion
    JOIN Mesas m ON r.idMesa = m.idMesa
    JOIN Salas s ON m.idSala = s.idSala
    WHERE s.idSala = @idSala
        AND r.fecha = @fecha
        AND r.horaInicio >= @horaInicio
        AND DATEADD(hour, @duracion, r.horaInicio) < r.horaFin;

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

    -- Seleccionar los materiales disponibles con su cantidad
    SELECT
        m.nombre AS nombreMaterial,
        md.cantidadDisponible AS cantidadDisponible
    FROM Materiales m
    JOIN @idMaterialesDisponibles md ON m.idMaterial = md.idMaterial;
