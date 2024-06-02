CREATE OR ALTER PROCEDURE getMaterialesBySala
    @idSala INT
AS
BEGIN
    SELECT 
        m.idMaterial AS id,
        m.nombre AS name,
        m.fotoURL AS image,
        ms.cantidad AS cantidadDisponible
    FROM 
        Materiales m
    INNER JOIN 
        MaterialesSalas ms ON m.idMaterial = ms.idMaterial
    WHERE 
        ms.idSala = @idSala;
END