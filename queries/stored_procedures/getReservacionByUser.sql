CREATE PROCEDURE getReservacionByUser
	@idUsuario varchar(10)
AS

    SET NOCOUNT ON;
    SELECT *
    FROM [dbo].[Reservaciones]
    WHERE idUsuario = @idUsuario;