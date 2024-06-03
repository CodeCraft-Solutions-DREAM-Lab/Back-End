CREATE PROCEDURE getReservInfoById
    @idReservacion INT
AS
BEGIN
    SELECT CONCAT(U.nombre, ' ', U.apellidoP, ' ', U.apellidoM) as studentName,
    UPPER(U.idUsuario) as studentMat,
    S.nombre as salaName,
    R.fecha as reservDate,
    R.horaInicio,
	R.duracion
    FROM [dbo].[Reservaciones] R
    JOIN [dbo].[Usuarios] U ON R.idUsuario = U.idUsuario
    JOIN [dbo].[Salas] S ON R.idSala = S.idSala
    WHERE R.idReservacion = 1;
END;
