CREATE OR ALTER TRIGGER trg_ActualizarEstatusMateriales
ON ReservacionesMateriales
AFTER UPDATE, INSERT
AS
BEGIN
    -- Variables para guardar el id de la reservación de la cual se está
    -- modificando el estatus de sus materiales. Asimismo, se guarda el conteo
    -- de materiales completados, en progreso y no completados.
    DECLARE @idReservacion INT;
    DECLARE @allCompleted INT, @inProgress INT, @noneCompleted INT;

    -- Se obtiene el id de la reservación de la cual se está modificando el
    -- estatus de sus materiales.
    SELECT @idReservacion = inserted.idReservacion
    FROM inserted
    GROUP BY inserted.idReservacion;

    -- Se obtiene el conteo de materiales completados, en progreso y no
    -- completados. 
    SELECT 
        @allCompleted = SUM(CASE WHEN estatus = 1 THEN 1 ELSE 0 END),
        @inProgress = SUM(CASE WHEN estatus = 6 THEN 1 ELSE 0 END),
        @noneCompleted = SUM(CASE WHEN estatus = 1 THEN 0 ELSE 1 END)
    FROM ReservacionesMateriales
    WHERE idReservacion = @idReservacion;

    -- Se actualiza el estatus de los materiales de la reservación.
    -- Si todos los materiales están completados
    IF @allCompleted > 0 AND @noneCompleted = 0
    BEGIN
        UPDATE Reservaciones
        SET estatusMateriales = 1
        WHERE idReservacion = @idReservacion;
    END
    -- Si algunos materiales están completados, pero no todos
    ELSE IF @allCompleted > 0
    BEGIN
        UPDATE Reservaciones
        SET estatusMateriales = 2
        WHERE idReservacion = @idReservacion;
    END
    -- Si no hay materiales asociados con la reservacion
    ELSE IF @allCompleted = 0 AND @noneCompleted = 0
    BEGIN
        UPDATE Reservaciones
        SET estatusMateriales = 1
        WHERE idReservacion = @idReservacion;
    END
    -- Si ningún material está completado
    ELSE
    BEGIN
        UPDATE Reservaciones
        SET estatusMateriales = 7
        WHERE idReservacion = @idReservacion;
    END
END;
