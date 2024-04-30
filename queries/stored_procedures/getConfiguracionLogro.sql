DROP PROCEDURE IF EXISTS getConfiguracionLogro;  
GO  

CREATE PROCEDURE getConfiguracionLogro 
    @idUsuario VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT l.idLogro, l.nombre, l.iconoURL, u.colorPreferido
    	FROM Logros AS l
		INNER JOIN UsuariosLogros ul ON l.idLogro = ul.idLogro
        INNER JOIN Usuarios u ON ul.idUsuario = u.idUsuario
	WHERE
		ul.idUsuario = @idUsuario AND
		u.logroPrincipal = ul.idLogro
END