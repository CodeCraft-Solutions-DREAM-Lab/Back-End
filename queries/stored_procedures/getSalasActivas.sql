CREATE OR ALTER PROCEDURE getSalasActivas
AS
BEGIN
    SET NOCOUNT ON;

    -- Traer todas las salas que no esten bloqueadas
    SELECT *
        FROM [dbo].[Salas]
        WHERE Salas.bloqueada = 0;
END;
GO;