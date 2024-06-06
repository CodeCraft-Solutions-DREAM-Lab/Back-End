;
CREATE   PROCEDURE toggleEstadoFromSala
    @idSala INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Salas
        SET bloqueada = CASE 
                WHEN bloqueada = 1 THEN 0 
                ELSE 1 
            END
	WHERE idSala = @idSala;
END;