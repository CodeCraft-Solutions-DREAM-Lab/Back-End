CREATE OR ALTER TRIGGER trg_UpdateEstatusMaterialesOnReservInsert
ON [dbo].[Reservaciones]
AFTER INSERT
AS
BEGIN
    -- Updating all newly inserted reservations
    UPDATE [dbo].[Reservaciones]
    SET estatusMateriales = 1
    FROM [dbo].[Reservaciones] r
    JOIN inserted i ON r.idReservacion = i.idReservacion
    WHERE NOT EXISTS (
        SELECT 1
        FROM [dbo].[ReservacionesMateriales] rm
        WHERE rm.idReservacion = i.idReservacion
        AND rm.estatus = 1
    );

    UPDATE [dbo].[Reservaciones]
    SET estatusMateriales = 7
    FROM [dbo].[Reservaciones] r
    JOIN inserted i ON r.idReservacion = i.idReservacion
    WHERE EXISTS (
        SELECT 1
        FROM [dbo].[ReservacionesMateriales] rm
        WHERE rm.idReservacion = i.idReservacion
        AND rm.estatus = 7
    );
END;
