CREATE OR ALTER PROCEDURE getReservacionesFromSalaByDate
	@idSala INT,
    @fecha DATE
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * 
        FROM [dbo].[Reservaciones] 
        WHERE idSala = @idSala 
        AND fecha = @fecha;
END;
GO;