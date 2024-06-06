CREATE OR ALTER PROCEDURE crearExperiencia
    @idUF INT = NULL,
    @idSala INT,
    @nombre VARCHAR(255),
    @descripcion VARCHAR(500),
    @esAutoDirigida BIT,
    @esExclusivaUF BIT,
    @portadaURL VARCHAR(255),
    @fechaInicio DATETIME,
    @fechaFin DATETIME,
    @materialesExperiencia VARCHAR(500),
    @instruccionesURL VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Iniciar transacción
        BEGIN TRANSACTION;

        -- Insertar la experiencia en la tabla Experiencias
        INSERT INTO Experiencias (idUF, idSala, nombre, descripcion, esAutoDirigida, esExclusivaUF, portadaURL, fechaInicio, fechaFin, instruccionesURL, horaFin)
        VALUES (@idUF, @idSala, @nombre, @descripcion, @esAutoDirigida, @esExclusivaUF, @portadaURL, @fechaInicio, @fechaFin, @instruccionesURL, NULL);

        -- Obtener el ID de la experiencia recién insertada
        DECLARE @idExperiencia INT;
        SET @idExperiencia = SCOPE_IDENTITY();

        -- Parsear el string de materiales y agregar a MaterialesRecomendados
        -- Asumimos que el formato de materialesExperiencia es un JSON array de objetos [{materialId:1, quantity:1, ...}]
        DECLARE @json VARCHAR(500) = @materialesExperiencia;

        -- Insertar los materiales recomendados
        INSERT INTO MaterialesRecomendados (idExperiencia, idMaterial, cantidad)
        SELECT
            @idExperiencia AS idExperiencia,
            JSON_VALUE(value, '$.materialId') AS idMaterial,
            JSON_VALUE(value, '$.quantity') AS cantidad
        FROM OPENJSON(@json);

        -- Confirmar transacción
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Revertir transacción en caso de error
        ROLLBACK TRANSACTION;

        -- Lanzar el error
        THROW;
    END CATCH;
END;
GO;