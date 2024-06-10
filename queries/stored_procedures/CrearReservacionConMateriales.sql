CREATE OR ALTER PROCEDURE CrearReservacionConMateriales
    @idUsuario VARCHAR(10),
    @idSala INT,
    @idExperiencia INT,
    @horaInicio TIME,
    @duracion INT,
    @fecha DATE,
    @idMesa INT,
    @estatus INT,
    @numPersonas INT,
    @materiales NVARCHAR(MAX) -- JSON con los materiales y cantidades
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @idReservacion INT;
    DECLARE @estatusMateriales INT;
    
    -- Calcular estatusMateriales
    IF @materiales IS NULL OR LEN(@materiales) = 0
    BEGIN
        SET @estatusMateriales = 1;
    END
    ELSE
    BEGIN
        SET @estatusMateriales = 7;
    END

    -- Inserta una nueva reservación
    INSERT INTO Reservaciones (
        idUsuario,
        idSala,
        idExperiencia,
        idMesa,
        estatus,
        estatusMateriales,
        horaInicio,
        duracion,
        fecha,
        numPersonas,
        asistencia
    )
    VALUES (
        @idUsuario,
        @idSala,
        @idExperiencia,
        @idMesa,
        @estatus,
        @estatusMateriales,
        @horaInicio,
        @duracion,
        @fecha,
        @numPersonas,
        NULL -- Asistencia inicializada a NULL
    );
    
    -- Obtener el id de la reservación recién insertada
    SET @idReservacion = SCOPE_IDENTITY();
    
    -- Si hay materiales, parsear el JSON y agregar cada material a ReservacionesMateriales
    IF @estatusMateriales = 7
    BEGIN
        -- Utiliza OPENJSON para parsear el JSON
        INSERT INTO ReservacionesMateriales (
            idReservacion,
            idMaterial,
            cantidad,
            estatus
        )
        SELECT 
            @idReservacion,
            JSON_VALUE(value, '$.idMaterial') AS idMaterial,
            JSON_VALUE(value, '$.cantidad') AS cantidad,
            7
        FROM OPENJSON(@materiales);
    END
END;
GO;
