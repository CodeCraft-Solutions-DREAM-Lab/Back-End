CREATE PROCEDURE getPreparedItemsWithReservId
    @idReservacion INT
AS
BEGIN
    SELECT M.nombre as name,
    RM.cantidad AS quantity
    FROM [dbo].[ReservacionesMateriales] RM
    JOIN [dbo].[Materiales] M ON M.idMaterial = RM.idMaterial
	JOIN [dbo].[Reservaciones] R ON R.idReservacion = RM.idReservacion
    WHERE RM.idReservacion = @idReservacion AND R.estatusMateriales = 1;
END;
