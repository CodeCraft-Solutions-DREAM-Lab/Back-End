CREATE OR ALTER PROCEDURE setReservacionMaterialEstatus
    @idReservacion INT,
    @idMaterial INT,
    @idEstatus INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE ReservacionesMateriales
        SET estatus = @idEstatus
    WHERE idReservacion = @idReservacion AND idMaterial = @idMaterial
END;
GO;