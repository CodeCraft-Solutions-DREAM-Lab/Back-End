CREATE OR ALTER PROCEDURE getPerfilUsuario
    @idUsuario VARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;

    -- 1. Obtener puntos de prioridad del usuario
    SELECT u.prioridad, u.nombre, u.apellidoP, u.apellidoM, l.nombre AS apodo, l.iconoURL
    FROM Usuarios AS u
	INNER JOIN Logros AS l ON u.logroPrincipal = l.idLogro
    WHERE u.IdUsuario = @idUsuario;

    -- 2. Obtener reservaciones del usuario
	SELECT r.*, e.nombre AS nombre_experiencia, s.nombre AS nombre_sala
	FROM (
	SELECT TOP (1000)[idReservacion]
		  [idReservacion]
		  ,[idSala]
		  ,[idExperiencia]
		  ,[idMesa]
		  ,[estatus]
		  ,[horaInicio]
		  ,[duracion]
		  ,[fecha]
		  ,[numPersonas]
	  FROM [dbo].[Reservaciones]

		  WHERE idUsuario = @idUsuario
	) AS r
	LEFT JOIN Experiencias e ON r.idExperiencia = e.idExperiencia
	INNER JOIN Salas s ON r.idSala = s.idSala;

    -- 3. Obtener logros (general)
    SELECT l.idLogro, l.nombre, l.descripcion, l.prioridadOtorgada, l.color, l.iconoURL, l.valorMax
    FROM Logros AS l

	-- 4. Obtener logros de usuario 
	SELECT lu.idLogro, lu.valorActual, lu.obtenido
    FROM UsuariosLogros AS lu
	WHERE lu.idUsuario = @idUsuario;

END;
GO
