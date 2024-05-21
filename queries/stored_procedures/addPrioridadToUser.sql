DROP PROCEDURE IF EXISTS addPrioridadToUser;
GO

CREATE PROCEDURE addPrioridadToUser
    @idUsuario VARCHAR(10),
    @prioridad INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Usuarios
        SET prioridad = prioridad + @prioridad
    WHERE idUsuario = @idUsuario
END