CREATE OR ALTER PROCEDURE GetSalasYMesasIntercaladasCronograma
AS
BEGIN
    DECLARE @salas TABLE (
        id INT,
        title VARCHAR(255),
        sala BIT,
        idSala INT
    );

    DECLARE @mesas TABLE (
        id INT,
        title VARCHAR(255),
        sala BIT,
        idSala INT
    );

    -- Insert Salas into @salas table with unique ids
    INSERT INTO @salas (id, title, sala, idSala)
    SELECT 
        ROW_NUMBER() OVER (ORDER BY idSala) + (SELECT COUNT(*) FROM Mesas) AS id,
        nombre AS title,
        1 AS sala,
        idSala
    FROM 
        Salas;

    -- Insert Mesas into @mesas table with ids matching their table
    INSERT INTO @mesas (id, title, sala, idSala)
    SELECT 
        idMesa AS id,
        'Mesa ' + CAST(ROW_NUMBER() OVER (PARTITION BY idSala ORDER BY idMesa) AS VARCHAR) AS title,
        0 AS sala,
        idSala
    FROM 
        Mesas;

    -- Select from both @salas and @mesas and order by idSala and sala
    SELECT * FROM @salas
    UNION ALL
    SELECT * FROM @mesas
    ORDER BY idSala, sala DESC, id;
END;
GO;
