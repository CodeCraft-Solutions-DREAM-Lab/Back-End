CREATE OR ALTER PROCEDURE getDataLogroCorreo
    @idUsuario VARCHAR(10),
    @idLogro INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @nombre VARCHAR(255);
    DECLARE @logro VARCHAR(255);
    DECLARE @icono VARCHAR(255);
    DECLARE @color VARCHAR(100);

    SELECT @nombre = CONCAT(u.nombre, ' ', u.apellidoP, ' ', u.apellidoM)
        FROM Usuarios AS u
        WHERE u.idUsuario = @idUsuario;

    SELECT @logro = l.nombre, @icono = l.iconoURL, @color = l.color
        FROM Logros AS l
        WHERE l.idLogro = @idLogro;

    SELECT @nombre AS nombre, @logro AS logro, @icono AS icono, @color AS color;

END;
GO;
