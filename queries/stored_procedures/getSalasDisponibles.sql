DROP PROCEDURE IF EXISTS getSalasDisponibles;

GO CREATE PROCEDURE getSalasDisponibles AS BEGIN
SET
    NOCOUNT ON;

SELECT
    nombre,
    bloqueada
FROM
    Salas;

END;

GO