CREATE PROCEDURE getItemsToPrepareWithReservId
    @idReservacion INT
AS
BEGIN
    SELECT RM.idReservacion as idReservacion,
    RM.idMaterial as idMaterial,
    M.nombre as name,
    RM.cantidad AS quantity,
    RM.estatus AS estatus
    FROM [dbo].[ReservacionesMateriales] RM
    JOIN [dbo].[Materiales] M ON M.idMaterial = RM.idMaterial
    WHERE RM.idReservacion = @idReservacion;
END;
