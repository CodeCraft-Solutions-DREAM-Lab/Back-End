CREATE OR ALTER TRIGGER trg_ActualizarEstatusMaterialesOnInsert
ON ReservacionesMateriales
AFTER INSERT
AS
BEGIN
    -- Temporary table to store the counts for each idReservacion
    DECLARE @counts TABLE (
        idReservacion INT,
        allCompleted INT,
        inProgress INT,
        noneCompleted INT
    );

    -- Get the counts for each idReservacion in the inserted table
    INSERT INTO @counts
    SELECT 
        idReservacion,
        SUM(CASE WHEN estatus = 1 THEN 1 ELSE 0 END),
        SUM(CASE WHEN estatus = 2 THEN 1 ELSE 0 END),
        SUM(CASE WHEN estatus = 1 THEN 0 ELSE 1 END)
    FROM inserted
    GROUP BY idReservacion;

    -- Update the estatusMateriales for each idReservacion
    UPDATE R
    SET estatusMateriales = CASE
        WHEN C.allCompleted > 0 AND C.noneCompleted = 0 THEN 1
        WHEN C.allCompleted > 0  THEN 2
        WHEN C.allCompleted = 0 AND C.noneCompleted = 0 THEN 1
        ELSE 7
    END
    FROM Reservaciones R
    JOIN @counts C ON R.idReservacion = C.idReservacion;
END;