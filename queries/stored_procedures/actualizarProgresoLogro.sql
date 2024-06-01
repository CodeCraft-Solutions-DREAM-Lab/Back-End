DROP PROCEDURE IF EXISTS actualizarProgresoLogro;
GO

CREATE PROCEDURE actualizarProgresoLogro
    @idUsuario VARCHAR(10),
    @idLogro INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @obtenido BIT;
    DECLARE @valorActual INT;
    DECLARE @valorMax INT;
    DECLARE @prioridadOtorgada INT;
    DECLARE @nuevaPrioridad INT;
    DECLARE @obtenidoPreviamente BIT;
    DECLARE @nombreLogro VARCHAR(255);
    DECLARE @descripcionLogro VARCHAR(255);
    DECLARE @iconoLogro VARCHAR(255);
    DECLARE @colorLogro VARCHAR(100);

    -- Comenzar transacción para que no haya inconsistencias de los datos
    BEGIN TRANSACTION;

    BEGIN TRY
        -- 1. Obtener progreso de logro
        SELECT @valorActual = lu.valorActual,
                @obtenido = lu.obtenido
            FROM UsuariosLogros AS lu
            WHERE lu.idUsuario = @idUsuario AND lu.idLogro = @idLogro;

        -- 2. Obtener valor maximo del logro
        SELECT @valorMax = l.valorMax,
				@prioridadOtorgada = l.prioridadOtorgada,
				@nombreLogro = l.nombre,
                @descripcionLogro = l.descripcion,
                @iconoLogro = l.iconoURL,
                @colorLogro = l.color
            FROM Logros AS l
            WHERE l.idLogro = @idLogro;

        -- 3. Verificar si el logro ya ha sido obtenido previamente
        SELECT @obtenidoPreviamente = lu.obtenido
            FROM UsuariosLogros AS lu
            WHERE lu.idUsuario = @idUsuario AND lu.idLogro = @idLogro;

        -- 4. Incrementar progreso de logro si no ha sido obtenido
        IF @valorActual < @valorMax
        BEGIN
            UPDATE UsuariosLogros
                SET valorActual = @valorActual + 1
                WHERE idUsuario = @idUsuario AND idLogro = @idLogro;

            -- 5. Verificar si se ha alcanzado el valor máximo después del incremento
            SELECT @valorActual = valorActual
                FROM UsuariosLogros
                WHERE idUsuario = @idUsuario AND idLogro = @idLogro;

            -- 6. Si se ha alcanzado el valor maximo, marcarlo como obtenido y otorgar la prioridad
            IF @valorActual >= @valorMax
            BEGIN
                UPDATE UsuariosLogros
                    SET obtenido = 1
                    WHERE idUsuario = @idUsuario AND idLogro = @idLogro;

                UPDATE Usuarios
                    SET prioridad = prioridad + @prioridadOtorgada
                    WHERE idUsuario = @idUsuario;

                SELECT @nuevaPrioridad = prioridad
                    FROM Usuarios
                    WHERE idUsuario = @idUsuario;
            END
        END

        -- Commit a la transacción
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback a la transacción en caso de error
        ROLLBACK TRANSACTION;

        -- Mandar el error
        THROW;
    END CATCH;

    -- 7. Obtener progreso actualizado
    SELECT lu.valorActual,
            @valorMax AS valorMax,
            lu.obtenido,
            @nuevaPrioridad AS nuevaPrioridad,
            @prioridadOtorgada AS prioridadOtorgada,
            @obtenidoPreviamente AS obtenidoPreviamente,
            @nombreLogro AS nombreLogro,
            @descripcionLogro AS descripcionLogro,
            @iconoLogro AS iconoLogro,
            @colorLogro AS colorLogro
        FROM UsuariosLogros AS lu
        WHERE lu.idUsuario = @idUsuario AND lu.idLogro = @idLogro
END;
GO
