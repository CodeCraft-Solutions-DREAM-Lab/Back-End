CREATE OR ALTER PROCEDURE getReservacionesConfirmadasInDateRange
    @horaLow TIME,
    @horaHigh TIME,
    @fecha DATE
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM [dbo].[Reservaciones] 
        WHERE fecha = @fecha
        AND horaInicio >= @horaLow
        AND horaInicio < @horaHigh
        AND estatus = 3;
END;
GO;