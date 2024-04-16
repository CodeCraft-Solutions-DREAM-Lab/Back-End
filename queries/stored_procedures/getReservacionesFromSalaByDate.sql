CREATE PROCEDURE getReservacionesFromSalaByDate
	@idSala INT,
    @fecha DATE
AS

    SET NOCOUNT ON;
    SELECT * 
    FROM [dbo].[Reservaciones] 
    WHERE idSala = @idSala 
    AND fecha = @fecha;

