CREATE OR ALTER PROCEDURE getLogrosByUser 
    @idUsuario VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT l.idLogro, l.nombre, l.iconoURL
    	FROM Logros AS l
		INNER JOIN UsuariosLogros ul ON l.idLogro = ul.idLogro
	WHERE
		ul.idUsuario = @idUsuario AND
		ul.obtenido = 1
END;
GO;