CREATE PROCEDURE getItemsToPrepareWithReservId
    @idReservacion INT
AS
BEGIN
    SELECT M.nombre as name,
    RM.cantidad AS quantity
    FROM [dbo].[ReservacionesMateriales] RM
    JOIN [dbo].[Materiales] M ON M.idMaterial = RM.idMaterial
    WHERE RM.idReservacion = @idReservacion;
END;
