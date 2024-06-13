CREATE OR ALTER PROCEDURE getReservacionesWithStatusFromSalaByDate
	@idSala INT,
    @fecha DATE,
    @idEstatus INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * 
    FROM [dbo].[Reservaciones] 
    WHERE idSala = @idSala 
    AND fecha = @fecha
    AND estatus = @idEstatus;
END;
GO;