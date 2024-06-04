CREATE OR ALTER TRIGGER trg_SetEstatusMaterialesOnReservInsert
ON [dbo].[Reservaciones]
AFTER INSERT
AS
BEGIN
    -- Updating all newly inserted reservations
    UPDATE [dbo].[Reservaciones]
    SET estatusMateriales = 1
    FROM [dbo].[Reservaciones] r
    INNER JOIN inserted i 
    ON r.idReservacion = i.idReservacion
END;
