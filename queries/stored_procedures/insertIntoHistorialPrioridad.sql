CREATE OR ALTER PROCEDURE insertIntoHistorialPrioridad
    @idUsuario VARCHAR(10),
    @fecha DATE,
    @prioridad INT,
    @motivo VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO HistorialPrioridad (idUsuario, fecha, prioridad, motivo)
    VALUES (@idUsuario, @fecha, @prioridad, @motivo)
END;
GO;