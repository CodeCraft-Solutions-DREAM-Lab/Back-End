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

    -- 1. Obtener progreso de logro
    SELECT @valorActual = lu.valorActual, @obtenido = lu.obtenido
        FROM UsuariosLogros AS lu
        WHERE lu.idUsuario = @idUsuario AND lu.idLogro = @idLogro;

    -- 2. Obtener valor maximo del logro
    SELECT @valorMax = l.valorMax
        FROM Logros AS l
        WHERE l.idLogro = @idLogro;

    -- 3. Incrementar progreso de logro si no ha sido obtenido
    IF @valorActual < @valorMax
    BEGIN
        UPDATE UsuariosLogros
            SET valorActual = @valorActual + 1
            WHERE idUsuario = @idUsuario AND idLogro = @idLogro;

        -- 4. Verificar si se ha alcanzado el valor máximo después del incremento
        SELECT @valorActual = valorActual
            FROM UsuariosLogros
            WHERE idUsuario = @idUsuario AND idLogro = @idLogro;

        -- 5. Si se ha alcanzado el valor maximo, marcarlo como obtenido
        IF @valorActual >= @valorMax
        BEGIN
            UPDATE UsuariosLogros
                SET obtenido = 1
                WHERE idUsuario = @idUsuario AND idLogro = @idLogro;
        END
    END

    -- 6. Obtener progreso actualizado
    SELECT TOP 1 lu.valorActual, @valorMax AS valorMax, lu.obtenido
        FROM UsuariosLogros AS lu
        WHERE lu.idUsuario = @idUsuario AND lu.idLogro = @idLogro;

END;
GO
