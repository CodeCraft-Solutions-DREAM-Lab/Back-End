DROP PROCEDURE IF EXISTS setEstatusFromReservacion;
GO

CREATE PROCEDURE setEstatusFromReservacion
    @idReservacion INT,
    @idEstatus INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Reservaciones
        SET estatus = @idEstatus
    WHERE idReservacion = @idReservacion
END