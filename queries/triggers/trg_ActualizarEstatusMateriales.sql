CREATE OR ALTER TRIGGER trg_ActualizarEstatusMateriales
ON ReservacionesMateriales
AFTER UPDATE
AS
BEGIN
    -- Declare variables to hold reservation id and status counts
    DECLARE @idReservacion INT;

    -- Get the reservation id from the updated rows
    SELECT @idReservacion = inserted.idReservacion
    FROM inserted
    GROUP BY inserted.idReservacion;

    -- Check the status of all materials for the reservation
    DECLARE @allCompleted INT, @inProgress INT, @noneCompleted INT;

    SELECT 
        @allCompleted = SUM(CASE WHEN estatus = 1 THEN 1 ELSE 0 END),
        @inProgress = SUM(CASE WHEN estatus = 6 THEN 1 ELSE 0 END),
        @noneCompleted = SUM(CASE WHEN estatus = 1 THEN 0 ELSE 1 END)
    FROM ReservacionesMateriales
    WHERE idReservacion = @idReservacion;

    -- Update the estatusMateriales field in Reservaciones table
    IF @allCompleted > 0 AND @noneCompleted = 0
    BEGIN
        -- All materials are completed
        UPDATE Reservaciones
        SET estatusMateriales = 1
        WHERE idReservacion = @idReservacion;
    END
    ELSE IF @allCompleted > 0
    BEGIN
        -- Some materials are completed, but not all
        UPDATE Reservaciones
        SET estatusMateriales = 2
        WHERE idReservacion = @idReservacion;
    END
    ELSE
    BEGIN
        -- No materials are completed
        UPDATE Reservaciones
        SET estatusMateriales = 6
        WHERE idReservacion = @idReservacion;
    END
END;
