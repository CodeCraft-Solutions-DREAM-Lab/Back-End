DROP PROCEDURE IF EXISTS setConfiguracionLogroUsuario;
GO

CREATE PROCEDURE setConfiguracionLogroUsuario
    @idUsuario VARCHAR(10),
    @idLogro INT,
    @colorPreferido VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Usuarios
        SET logroPrincipal = @idLogro, colorPreferido = @colorPreferido
    WHERE idUsuario = @idUsuario
END