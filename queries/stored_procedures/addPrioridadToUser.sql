CREATE OR ALTER PROCEDURE addPrioridadToUser
    @idUsuario VARCHAR(10),
    @prioridad INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Usuarios
        SET prioridad = prioridad + @prioridad
    WHERE idUsuario = @idUsuario
END;
GO;
