CREATE OR ALTER PROCEDURE getUserIdByReservId
    @idReservacion INT
AS
BEGIN
    SELECT idUsuario
    FROM 
        Reservaciones
    WHERE 
        idReservacion = @idReservacion;
END;
GO;