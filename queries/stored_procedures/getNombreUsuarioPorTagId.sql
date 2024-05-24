CREATE OR ALTER PROCEDURE getNombreUsuarioPorTagId
    @p_tagId VARCHAR(50)
AS
BEGIN
    DECLARE @nombre VARCHAR(255);

    -- Buscar el nombre del usuario correspondiente al tagId proporcionado
    SELECT @nombre = ISNULL(nombre, 'Usuario no encontrado') 
    FROM Usuarios 
    WHERE idUsuario = (
        SELECT idUsuario FROM Credenciales WHERE tagId = @p_tagId
    );

    -- Devolver el nombre del usuario
    SELECT @nombre AS NombreUsuario;
END;
