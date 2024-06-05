CREATE OR ALTER PROCEDURE getReservacionByUser
	@idUsuario varchar(10)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT *
    FROM [dbo].[Reservaciones]
    WHERE idUsuario = @idUsuario;
END;
GO;
