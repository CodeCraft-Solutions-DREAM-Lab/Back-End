;
CREATE   PROCEDURE getProximasReservacionesBySala
	@idSala varchar(10)
AS
BEGIN
    SET NOCOUNT ON;
    -- Obtener la fecha actual
    DECLARE @fechaActual DATETIME = GETDATE();

    -- Traer todas las reservaciones de la sala desde la fecha actual en adelante
    SELECT *
    FROM [dbo].[Reservaciones]
    WHERE idSala = @idSala
    AND fecha >= @fechaActual
	AND estatus != 4
	AND estatus != 6;
END;