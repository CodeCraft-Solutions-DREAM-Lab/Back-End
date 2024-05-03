CREATE PROCEDURE getReservacionesWithStatusFromSalaByDate
	@idSala INT,
    @fecha DATE,
    @idEstatus INT
AS

    SET NOCOUNT ON;
    SELECT * 
    FROM [dbo].[Reservaciones] 
    WHERE idSala = @idSala 
    AND fecha = @fecha
    AND estatus = @idEstatus;

