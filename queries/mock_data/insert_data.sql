-- ADD SAMPLE DATA TO THE TABLES
-- Sample data for Estatus
INSERT INTO
    Estatus (nombre, descripcion)
VALUES
    ('Preparado', 'El material ha sido preparado'),
    (
        'En progreso',
        'El material esta siendo preparado'
    ),
    ('Confirmada', 'La reserva ha sido confirmada'),
    ('Cancelada', 'La reserva ha sido cancelada'),
    (
        'En espera',
        'La solicitud de reserva esta en espera'
    ),
    (
        'Denegada',
        'La solicitud de reserva ha sido negada'
    ),
    (
        'Sin preparar',
        'El material no ha sido preparado'
    );

-- Sample data for UnidadesFormacion
INSERT INTO
    UnidadesFormacion (nombre)
VALUES
    ('Interconexión de dispositivos'),
    ('Construcción de software y toma de decisiones'),
    ('Análisis y diseño de algoritmos avanzados'),
    ('Desarrollo de software'),
    ('Integración de seguridad informática en redes y sistemas de software'),
    ('Modelación de sistemas multiagentes con gráficas computacionales'),
    ('Implementación de métodos computacionales');

-- Sample data for Usuarios
INSERT INTO
    Usuarios (
        idUsuario,
        nombre,
        apellidoP,
        apellidoM,
        tipo,
        prioridad,
        logroPrincipal,
        colorPreferido
    )
VALUES
    (
        'a01368580',
        'Roberta Giovanna',
        'González',
        'Canavati',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00835268',
        'Karen',
        'Gutiérrez',
        'Solís',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a01027008',
        'Nahomi Daniela',
        'Plata',
        'Ulate',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00833125',
        'Roberto',
        'Ríos',
        'Olaiz',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a01198189',
        'Eugenio',
        'Turcott',
        'Estrada',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00830194',
        'María Fernanda',
        'Argueta',
        'Wolke',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00227838',
        'Ramón Yuri',
        'Danzos',
        'García',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00832239',
        'Andrés Marcelo',
        'De Luna',
        'Pámanes',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a01252605',
        'Ana Jimena',
        'Gallegos',
        'Rongel',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a01721881',
        'Luis Eduardo',
        'Garza',
        'Naranjo',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a01411863',
        'Roberto Andonie',
        'Hernández',
        'Pérez',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a01721636',
        'Carlos',
        'Cuilty',
        'Villarreal',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a01351989',
        'Emilio',
        'De Gyves',
        'García',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a01026999',
        'Alberto Iván',
        'Tamez',
        'González',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a01721735',
        'Eduardo',
        'Tello',
        'Gómez',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00834801',
        'David Julio',
        'Faudoa',
        'González',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00834434',
        'Mario Raúl',
        'Fernández',
        'Calleros',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a01571142',
        'Francisco Javier',
        'Lugo',
        'Gutiérrez',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00830223',
        'José Antonio',
        'Ramírez',
        'Oliva',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00834526',
        'Patricio',
        'Villarreal',
        'Welsh',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a01412726',
        'Jinelle',
        'Flores',
        'Etienne',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00833852',
        'Roberto',
        'González',
        'Reyes',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00829814',
        'Reynaldo',
        'Hernández',
        'González',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00833173',
        'Jaime Eduardo',
        'López',
        'Castro',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a01280601',
        'Efraín',
        'Martínez',
        'Garza',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a01177767',
        'Christopher Gabriel',
        'Pedraza',
        'Pohlenz',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00833416',
        'Michelle',
        'Bojórquez',
        'Gómez',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00829931',
        'Fernando',
        'Bustos',
        'Monsiváis',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a01383393',
        'Rodolfo Charles',
        'Wah',
        'Cruz',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a01384738',
        'Diego Thomas',
        'Gocht',
        'Aguero',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00833968',
        'José Eduardo',
        'Gómez',
        'Saldaña',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00832807',
        'Manuel José',
        'Ortiz',
        'Urueña',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'l00000010',
        'Cristina',
        'González',
        'Cordova',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'l00000020',
        'Lorena',
        'Martínez',
        'Hernández',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        '0012007098',
        'Rolando',
        'Martínez',
        'Hernández',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'a00000000',
        'Estudiante',
        '',
        '',
        'Regular',
        362,
        1,
        '#78C2F8'
    ),
    (
        'admin',
        'Administrador',
        '',
        '',
        'Admin',
        362,
        1,
        '#78C2F8'
    );

-- Sample data for Credenciales
INSERT INTO
    Credenciales (idUsuario, contrasena, tagId)
VALUES
    (
        'a01368580',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '0211620511'
    ),
    (
        'a00835268',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        NULL
    ),
    (
        'a01027008',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3688077404'
    ),
    (
        'a00833125',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3657171373'
    ),
    (
        'a01198189',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3656207741'
    ),
    (
        'a00830194',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        NULL
    ),
    (
        'a00227838',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3697978444'
    ),
    (
        'a00832239',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3657490365'
    ),
    (
        'a01252605',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        NULL
    ),
    (
        'a01721881',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3687729980'
    ),
    (
        'a01411863',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3687547932'
    ),
    (
        'a01721636',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3656653277'
    ),
    (
        'a01351989',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '0743336503'
    ),
    (
        'a01026999',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3657223293'
    ),
    (
        'a01721735',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3656162269'
    ),
    (
        'a00834801',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3325875150'
    ),
    (
        'a00834434',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3657436429'
    ),
    (
        'a01571142',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3656989661'
    ),
    (
        'a00830223',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        NULL
    ),
    (
        'a00834526',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        NULL
    ),
    (
        'a01412726',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3687865980'
    ),
    (
        'a00833852',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3698103436'
    ),
    (
        'a00829814',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '1234'
    ),
    (
        'a00833173',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3656505277'
    ),
    (
        'a01280601',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3656049821'
    ),
    (
        'a01177767',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3657110109'
    ),
    (
        'a00833416',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3655159597'
    ),
    (
        'a00829931',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3688986812'
    ),
    (
        'a01383393',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3655742077'
    ),
    (
        'a01384738',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3687375404'
    ),
    (
        'a00833968',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3229643950'
    ),
    (
        'a00832807',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '3657445997'
    ),
    (
        'l00000010',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '5215665220'
    ),
    (
        'l00000020',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '125122131173'
    ),
    (
        '0012007098',
        'b47db31ae3477535e27cf56c5913ea5861ee2fbdd7afc13595487f562159ec23b76828c0625c7493df9cdf09b358f576dccd7be0b49e4e8a908f92082a9fcf2f',
        '2841685520'
    ),
    (
        'admin',
        'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec',
        null
    )
    -- Sample data for GruposUsuarios
INSERT INTO
    GruposUsuarios (idUF, idUsuario)
VALUES
    (1, 'a01368580'),
    (1, 'a00835268'),
    (1, 'a01027008'),
    (1, 'a00833125'),
    (1, 'a01198189'),
    (1, 'a00830194'),
    (1, 'a00227838'),
    (1, 'a00832239'),
    (1, 'a01252605'),
    (1, 'a01721881'),
    (1, 'a01411863'),
    (1, 'a01721636'),
    (1, 'a01351989'),
    (1, 'a01026999'),
    (1, 'a01721735'),
    (1, 'a00834801'),
    (1, 'a00834434'),
    (1, 'a01571142'),
    (1, 'a00830223'),
    (1, 'a00834526'),
    (1, 'a01412726'),
    (1, 'a00833852'),
    (1, 'a00829814'),
    (1, 'a00833173'),
    (1, 'a01280601'),
    (1, 'a01177767'),
    (1, 'a00833416'),
    (1, 'a00829931'),
    (1, 'a01383393'),
    (1, 'a01384738'),
    (1, 'a00833968'),
    (1, 'a00832807'),
    (1, 'l00000010'),
    (1, 'l00000020'),
    (1, '0012007098'),
    (1, 'a00000000');

-- Sample data for Logros
INSERT INTO
    Logros (
        nombre,
        descripcion,
        prioridadOtorgada,
        iconoURL,
        color,
        valorMax
    )
VALUES
    (
        'Big Dreamer',
        'Reserva 50 veces algún espacio del D.R.E.A.M. Lab.',
        1,
        'https://dreamlabstorage.blob.core.windows.net/logros/BigDreamer.webp',
        '#AFB7FF',
        50
    ),
    (
        'Independent Learner',
        'Completa 20 experiencias autodirigidas.',
        1,
        'https://dreamlabstorage.blob.core.windows.net/logros/IndependentLearner.webp',
        '#C0A2FF',
        20
    ),
    (
        'Robot Expert',
        'Asiste a 5 eventos dentro del “Electric Garage”.',
        1,
        'https://dreamlabstorage.blob.core.windows.net/logros/RobotExpert.webp',
        '#78C2F8',
        5
    ),
    (
        'Testing Champion',
        'Reserva y asiste 5 veces a la sala “Testing Land”.',
        1,
        'https://dreamlabstorage.blob.core.windows.net/logros/TestingChampion.webp',
        '#FF87E5',
        5
    ),
    (
        'Ancient Soul',
        'Reserva y asiste 3 veces a la sala “Graveyard”.',
        1,
        'https://dreamlabstorage.blob.core.windows.net/logros/AncientSoul.webp',
        '#98A6B6',
        3
    ),
    (
        'Visionary',
        'Reserva y asiste 2 veces a la “Sala VR”.',
        1,
        'https://dreamlabstorage.blob.core.windows.net/logros/Visionary.webp',
        '#FF6073',
        2
    ),
    (
        'Priority Achiever',
        'Alcanza un puntaje de prioridad de al menos 500 puntos en una ocasión.',
        1,
        'https://dreamlabstorage.blob.core.windows.net/logros/PriorityAchiever.webp',
        '#F8E478',
        1
    ),
    (
        'Five-Star Player',
        'Forma parte del top 5 de usuarios con mayor prioridad.',
        1,
        'https://dreamlabstorage.blob.core.windows.net/logros/Trustworthy.webp',
        '#A0DE83',
        1
    ),
    (
        'Communicator',
        'Utiliza 1 vez el sistema de recomendaciones por voz.',
        1,
        'https://dreamlabstorage.blob.core.windows.net/logros/Communicator.webp',
        '#FEA767',
        1
    ),
    (
        'Artistic Alchemist',
        'Cambia tu icono de perfil por primera vez.',
        1,
        'https://dreamlabstorage.blob.core.windows.net/logros/ArtisticAlchemist.webp',
        '#FFCCCC',
        1
    );

-- Sample data for UsuariosLogros
INSERT INTO
    UsuariosLogros (idLogro, idUsuario, valorActual, obtenido)
VALUES
    (1, '0012007098', 50, 1),
    (2, '0012007098', 5, 0),
    (3, '0012007098', 5, 1),
    (4, '0012007098', 3, 0),
    (5, '0012007098', 3, 1),
    (6, '0012007098', 1, 0),
    (7, '0012007098', 0, 0),
    (8, '0012007098', 1, 1),
    (9, '0012007098', 0, 0),
    (10, '0012007098', 0, 0),
    -- Para A01368580
    (1, 'a01368580', 50, 1),
    (2, 'a01368580', 5, 0),
    (3, 'a01368580', 5, 1),
    (4, 'a01368580', 3, 0),
    (5, 'a01368580', 3, 1),
    (6, 'a01368580', 1, 0),
    (7, 'a01368580', 0, 0),
    (8, 'a01368580', 1, 1),
    (9, 'a01368580', 0, 0),
    (10, 'a01368580', 0, 0),
    -- Para a00835268
    (1, 'a00835268', 50, 1),
    (2, 'a00835268', 5, 0),
    (3, 'a00835268', 5, 1),
    (4, 'a00835268', 3, 0),
    (5, 'a00835268', 3, 1),
    (6, 'a00835268', 1, 0),
    (7, 'a00835268', 0, 0),
    (8, 'a00835268', 1, 1),
    (9, 'a00835268', 0, 0),
    (10, 'a00835268', 0, 0),
    -- Para a01027008
    (1, 'a01027008', 50, 1),
    (2, 'a01027008', 5, 0),
    (3, 'a01027008', 5, 1),
    (4, 'a01027008', 3, 0),
    (5, 'a01027008', 3, 1),
    (6, 'a01027008', 1, 0),
    (7, 'a01027008', 0, 0),
    (8, 'a01027008', 1, 1),
    (9, 'a01027008', 0, 0),
    (10, 'a01027008', 0, 0),
    -- Para a00833125 y así sucesivamente...
    (1, 'a00833125', 50, 1),
    (2, 'a00833125', 5, 0),
    (3, 'a00833125', 5, 1),
    (4, 'a00833125', 3, 0),
    (5, 'a00833125', 3, 1),
    (6, 'a00833125', 1, 0),
    (7, 'a00833125', 0, 0),
    (8, 'a00833125', 1, 1),
    (9, 'a00833125', 0, 0),
    (10, 'a00833125', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a01198189', 50, 1),
    (2, 'a01198189', 5, 0),
    (3, 'a01198189', 5, 1),
    (4, 'a01198189', 3, 0),
    (5, 'a01198189', 3, 1),
    (6, 'a01198189', 1, 0),
    (7, 'a01198189', 0, 0),
    (8, 'a01198189', 1, 1),
    (9, 'a01198189', 0, 0),
    (10, 'a01198189', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a00830194', 50, 1),
    (2, 'a00830194', 5, 0),
    (3, 'a00830194', 5, 1),
    (4, 'a00830194', 3, 0),
    (5, 'a00830194', 3, 1),
    (6, 'a00830194', 1, 0),
    (7, 'a00830194', 0, 0),
    (8, 'a00830194', 1, 1),
    (9, 'a00830194', 0, 0),
    (10, 'a00830194', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a00227838', 50, 1),
    (2, 'a00227838', 5, 0),
    (3, 'a00227838', 5, 1),
    (4, 'a00227838', 3, 0),
    (5, 'a00227838', 3, 1),
    (6, 'a00227838', 1, 0),
    (7, 'a00227838', 0, 0),
    (8, 'a00227838', 1, 1),
    (9, 'a00227838', 0, 0),
    (10, 'a00227838', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a00832239', 50, 1),
    (2, 'a00832239', 5, 0),
    (3, 'a00832239', 5, 1),
    (4, 'a00832239', 3, 0),
    (5, 'a00832239', 3, 1),
    (6, 'a00832239', 1, 0),
    (7, 'a00832239', 0, 0),
    (8, 'a00832239', 1, 1),
    (9, 'a00832239', 0, 0),
    (10, 'a00832239', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a01252605', 50, 1),
    (2, 'a01252605', 5, 0),
    (3, 'a01252605', 5, 1),
    (4, 'a01252605', 3, 0),
    (5, 'a01252605', 3, 1),
    (6, 'a01252605', 1, 0),
    (7, 'a01252605', 0, 0),
    (8, 'a01252605', 1, 1),
    (9, 'a01252605', 0, 0),
    (10, 'a01252605', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a01721881', 50, 1),
    (2, 'a01721881', 5, 0),
    (3, 'a01721881', 5, 1),
    (4, 'a01721881', 3, 0),
    (5, 'a01721881', 3, 1),
    (6, 'a01721881', 1, 0),
    (7, 'a01721881', 0, 0),
    (8, 'a01721881', 1, 1),
    (9, 'a01721881', 0, 0),
    (10, 'a01721881', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a01411863', 50, 1),
    (2, 'a01411863', 5, 0),
    (3, 'a01411863', 5, 1),
    (4, 'a01411863', 3, 0),
    (5, 'a01411863', 3, 1),
    (6, 'a01411863', 1, 0),
    (7, 'a01411863', 0, 0),
    (8, 'a01411863', 1, 1),
    (9, 'a01411863', 0, 0),
    (10, 'a01411863', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a01721636', 50, 1),
    (2, 'a01721636', 5, 0),
    (3, 'a01721636', 5, 1),
    (4, 'a01721636', 3, 0),
    (5, 'a01721636', 3, 1),
    (6, 'a01721636', 1, 0),
    (7, 'a01721636', 0, 0),
    (8, 'a01721636', 1, 1),
    (9, 'a01721636', 0, 0),
    (10, 'a01721636', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a01351989', 50, 1),
    (2, 'a01351989', 5, 0),
    (3, 'a01351989', 5, 1),
    (4, 'a01351989', 3, 0),
    (5, 'a01351989', 3, 1),
    (6, 'a01351989', 1, 0),
    (7, 'a01351989', 0, 0),
    (8, 'a01351989', 1, 1),
    (9, 'a01351989', 0, 0),
    (10, 'a01351989', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a01026999', 50, 1),
    (2, 'a01026999', 5, 0),
    (3, 'a01026999', 5, 1),
    (4, 'a01026999', 3, 0),
    (5, 'a01026999', 3, 1),
    (6, 'a01026999', 1, 0),
    (7, 'a01026999', 0, 0),
    (8, 'a01026999', 1, 1),
    (9, 'a01026999', 0, 0),
    (10, 'a01026999', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a01721735', 50, 1),
    (2, 'a01721735', 5, 0),
    (3, 'a01721735', 5, 1),
    (4, 'a01721735', 3, 0),
    (5, 'a01721735', 3, 1),
    (6, 'a01721735', 1, 0),
    (7, 'a01721735', 0, 0),
    (8, 'a01721735', 1, 1),
    (9, 'a01721735', 0, 0),
    (10, 'a01721735', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a00834801', 50, 1),
    (2, 'a00834801', 5, 0),
    (3, 'a00834801', 5, 1),
    (4, 'a00834801', 3, 0),
    (5, 'a00834801', 3, 1),
    (6, 'a00834801', 1, 0),
    (7, 'a00834801', 0, 0),
    (8, 'a00834801', 1, 1),
    (9, 'a00834801', 0, 0),
    (10, 'a00834801', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a00834434', 50, 1),
    (2, 'a00834434', 5, 0),
    (3, 'a00834434', 5, 1),
    (4, 'a00834434', 3, 0),
    (5, 'a00834434', 3, 1),
    (6, 'a00834434', 1, 0),
    (7, 'a00834434', 0, 0),
    (8, 'a00834434', 1, 1),
    (9, 'a00834434', 0, 0),
    (10, 'a00834434', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a01571142', 50, 1),
    (2, 'a01571142', 5, 0),
    (3, 'a01571142', 5, 1),
    (4, 'a01571142', 3, 0),
    (5, 'a01571142', 3, 1),
    (6, 'a01571142', 1, 0),
    (7, 'a01571142', 0, 0),
    (8, 'a01571142', 1, 1),
    (9, 'a01571142', 0, 0),
    (10, 'a01571142', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a00830223', 50, 1),
    (2, 'a00830223', 5, 0),
    (3, 'a00830223', 5, 1),
    (4, 'a00830223', 3, 0),
    (5, 'a00830223', 3, 1),
    (6, 'a00830223', 1, 0),
    (7, 'a00830223', 0, 0),
    (8, 'a00830223', 1, 1),
    (9, 'a00830223', 0, 0),
    (10, 'a00830223', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a00834526', 50, 1),
    (2, 'a00834526', 5, 0),
    (3, 'a00834526', 5, 1),
    (4, 'a00834526', 3, 0),
    (5, 'a00834526', 3, 1),
    (6, 'a00834526', 1, 0),
    (7, 'a00834526', 0, 0),
    (8, 'a00834526', 1, 1),
    (9, 'a00834526', 0, 0),
    (10, 'a00834526', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a01412726', 50, 1),
    (2, 'a01412726', 5, 0),
    (3, 'a01412726', 5, 1),
    (4, 'a01412726', 3, 0),
    (5, 'a01412726', 3, 1),
    (6, 'a01412726', 1, 0),
    (7, 'a01412726', 0, 0),
    (8, 'a01412726', 1, 1),
    (9, 'a01412726', 0, 0),
    (10, 'a01412726', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a00833852', 50, 1),
    (2, 'a00833852', 5, 0),
    (3, 'a00833852', 5, 1),
    (4, 'a00833852', 3, 0),
    (5, 'a00833852', 3, 1),
    (6, 'a00833852', 1, 0),
    (7, 'a00833852', 0, 0),
    (8, 'a00833852', 1, 1),
    (9, 'a00833852', 0, 0),
    (10, 'a00833852', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a00829814', 50, 1),
    (2, 'a00829814', 5, 0),
    (3, 'a00829814', 5, 1),
    (4, 'a00829814', 3, 0),
    (5, 'a00829814', 3, 1),
    (6, 'a00829814', 1, 0),
    (7, 'a00829814', 0, 0),
    (8, 'a00829814', 1, 1),
    (9, 'a00829814', 0, 0),
    (10, 'a00829814', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a00833173', 50, 1),
    (2, 'a00833173', 5, 0),
    (3, 'a00833173', 5, 1),
    (4, 'a00833173', 3, 0),
    (5, 'a00833173', 3, 1),
    (6, 'a00833173', 1, 0),
    (7, 'a00833173', 0, 0),
    (8, 'a00833173', 1, 1),
    (9, 'a00833173', 0, 0),
    (10, 'a00833173', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a01280601', 50, 1),
    (2, 'a01280601', 5, 0),
    (3, 'a01280601', 5, 1),
    (4, 'a01280601', 3, 0),
    (5, 'a01280601', 3, 1),
    (6, 'a01280601', 1, 0),
    (7, 'a01280601', 0, 0),
    (8, 'a01280601', 1, 1),
    (9, 'a01280601', 0, 0),
    (10, 'a01280601', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a01177767', 50, 1),
    (2, 'a01177767', 5, 0),
    (3, 'a01177767', 5, 1),
    (4, 'a01177767', 3, 0),
    (5, 'a01177767', 3, 1),
    (6, 'a01177767', 1, 0),
    (7, 'a01177767', 0, 0),
    (8, 'a01177767', 1, 1),
    (9, 'a01177767', 0, 0),
    (10, 'a01177767', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a00833416', 50, 1),
    (2, 'a00833416', 5, 0),
    (3, 'a00833416', 5, 1),
    (4, 'a00833416', 3, 0),
    (5, 'a00833416', 3, 1),
    (6, 'a00833416', 1, 0),
    (7, 'a00833416', 0, 0),
    (8, 'a00833416', 1, 1),
    (9, 'a00833416', 0, 0),
    (10, 'a00833416', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a00829931', 50, 1),
    (2, 'a00829931', 5, 0),
    (3, 'a00829931', 5, 1),
    (4, 'a00829931', 3, 0),
    (5, 'a00829931', 3, 1),
    (6, 'a00829931', 1, 0),
    (7, 'a00829931', 0, 0),
    (8, 'a00829931', 1, 1),
    (9, 'a00829931', 0, 0),
    (10, 'a00829931', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a01383393', 50, 1),
    (2, 'a01383393', 5, 0),
    (3, 'a01383393', 5, 1),
    (4, 'a01383393', 3, 0),
    (5, 'a01383393', 3, 1),
    (6, 'a01383393', 1, 0),
    (7, 'a01383393', 0, 0),
    (8, 'a01383393', 1, 1),
    (9, 'a01383393', 0, 0),
    (10, 'a01383393', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a01384738', 50, 1),
    (2, 'a01384738', 5, 0),
    (3, 'a01384738', 5, 1),
    (4, 'a01384738', 3, 0),
    (5, 'a01384738', 3, 1),
    (6, 'a01384738', 1, 0),
    (7, 'a01384738', 0, 0),
    (8, 'a01384738', 1, 1),
    (9, 'a01384738', 0, 0),
    (10, 'a01384738', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a00833968', 50, 1),
    (2, 'a00833968', 5, 0),
    (3, 'a00833968', 5, 1),
    (4, 'a00833968', 3, 0),
    (5, 'a00833968', 3, 1),
    (6, 'a00833968', 1, 0),
    (7, 'a00833968', 0, 0),
    (8, 'a00833968', 1, 1),
    (9, 'a00833968', 0, 0),
    (10, 'a00833968', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'a00832807', 50, 1),
    (2, 'a00832807', 5, 0),
    (3, 'a00832807', 5, 1),
    (4, 'a00832807', 3, 0),
    (5, 'a00832807', 3, 1),
    (6, 'a00832807', 1, 0),
    (7, 'a00832807', 0, 0),
    (8, 'a00832807', 1, 1),
    (9, 'a00832807', 0, 0),
    (10, 'a00832807', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'l00000010', 50, 1),
    (2, 'l00000010', 5, 0),
    (3, 'l00000010', 5, 1),
    (4, 'l00000010', 3, 0),
    (5, 'l00000010', 3, 1),
    (6, 'l00000010', 1, 0),
    (7, 'l00000010', 0, 0),
    (8, 'l00000010', 1, 1),
    (9, 'l00000010', 0, 0),
    (10, 'l00000010', 0, 0),
    -- Continuar para las demás matrículas...
    (1, 'l00000020', 50, 1),
    (2, 'l00000020', 5, 0),
    (3, 'l00000020', 5, 1),
    (4, 'l00000020', 3, 0),
    (5, 'l00000020', 3, 1),
    (6, 'l00000020', 1, 0),
    (7, 'l00000020', 0, 0),
    (8, 'l00000020', 1, 1),
    (9, 'l00000020', 0, 0),
    (10, 'l00000020', 0, 0),
    -- Estudiante de prueba
    (1, 'a00000000', 50, 1),
    (2, 'a00000000', 5, 0),
    (3, 'a00000000', 5, 1),
    (4, 'a00000000', 3, 0),
    (5, 'a00000000', 3, 1),
    (6, 'a00000000', 1, 0),
    (7, 'a00000000', 0, 0),
    (8, 'a00000000', 1, 1),
    (9, 'a00000000', 0, 0),
    (10, 'a00000000', 0, 0);

-- Sample data for Materiales
INSERT INTO
    Materiales (nombre, fotoURL)
VALUES
    (
        'Laptop Gamer',
        'https://dreamlabstorage.blob.core.windows.net/materiales/laptop-gamer.webp'
    ),
    (
        'Surface Pro',
        'https://dreamlabstorage.blob.core.windows.net/materiales/surface.webp'
    ),
    (
        'Chromebook',
        'https://dreamlabstorage.blob.core.windows.net/materiales/chromebook.webp'
    ),
    (
        'Oculus Quest 2',
        'https://dreamlabstorage.blob.core.windows.net/materiales/oculus.webp'
    ),
    (
        'HTC Vive Pro 2',
        'https://dreamlabstorage.blob.core.windows.net/materiales/vive.webp'
    ),
    (
        'PlayStation VR',
        'https://dreamlabstorage.blob.core.windows.net/materiales/playstationVR.webp'
    ),
    (
        'Visor VR para smartphone',
        'https://dreamlabstorage.blob.core.windows.net/materiales/vr-smartphone.webp'
    ),
    (
        'PC de escritorio',
        'https://dreamlabstorage.blob.core.windows.net/materiales/pc.webp'
    ),
    (
        'Tablet Android',
        'https://dreamlabstorage.blob.core.windows.net/materiales/android-tablet.webp'
    ),
    (
        'Tablet iPad',
        'https://dreamlabstorage.blob.core.windows.net/materiales/ipad.webp'
    ),
    (
        'Tablet Windows',
        'https://dreamlabstorage.blob.core.windows.net/materiales/tablet-windows.webp'
    ),
    (
        'Cámara Digital (DSLR)',
        'https://dreamlabstorage.blob.core.windows.net/materiales/camara.webp'
    ),
    (
        'Audífonos Over-Ear',
        'https://dreamlabstorage.blob.core.windows.net/materiales/audifonos.webp'
    ),
    (
        'Altavoces Bluetooth',
        'https://dreamlabstorage.blob.core.windows.net/materiales/altavoz.webp'
    ),
    (
        'Micrófono',
        'https://dreamlabstorage.blob.core.windows.net/materiales/microfono.webp'
    ),
    (
        'Router Wi-Fi',
        'https://dreamlabstorage.blob.core.windows.net/materiales/router.webp'
    ),
    (
        'Cable Ethernet',
        'https://dreamlabstorage.blob.core.windows.net/materiales/cable-ethernet.webp'
    ),
    (
        'Tarjeta de Red',
        'https://dreamlabstorage.blob.core.windows.net/materiales/tarjeta-red.webp'
    );

-- Sample data for Salas
INSERT INTO
    Salas (
        nombre,
        descripcion,
        cantidadMesas,
        fotoURL,
        detallesURL,
        bloqueada
    )
VALUES
    (
        'Electric Garage',
        'Este espacio dinámico y versátil es un sueño hecho realidad para los entusiastas de la electrónica. Equipado con las últimas herramientas y tecnologías, es el lugar ideal para dar vida a tus proyectos más ambiciosos.',
        8,
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://dreamlabstorage.blob.core.windows.net/archivos/electric-garage.webp',
        0
    ),
    (
        'Dimension Forge',
        'Un laboratorio de vanguardia donde la creatividad se fusiona con la tecnología. Aquí, los innovadores pueden explorar libremente nuevas ideas y experimentar con las últimas herramientas de diseño y fabricación.',
        6,
        'https://dreamlabstorage.blob.core.windows.net/archivos/vr-lede.webp',
        'https://dreamlabstorage.blob.core.windows.net/archivos/dimension-forge.webp',
        0
    ),
    (
        'New Horizons',
        'Inspirado por la curiosidad y el deseo de explorar lo desconocido, New Horizons es un lugar donde los límites de la tecnología se desdibujan. Desde la inteligencia artificial hasta la exploración espacial, aquí se dan los primeros pasos hacia el futuro.',
        7,
        'https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://dreamlabstorage.blob.core.windows.net/archivos/new-horizons.webp',
        0
    ),
    (
        'Deep Net',
        'Sumérgete en las profundidades de la seguridad informática y las redes con Deep Net. Equipado con tecnología de última generación y expertos en el campo, es el lugar perfecto para poner a prueba tus habilidades y descubrir nuevos horizontes en el ciberespacio.',
        5,
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://dreamlabstorage.blob.core.windows.net/archivos/deep-net.webp',
        0
    ),
    (
        'Graveyard',
        'No es un lugar de descanso, sino de reinvención. Graveyard es donde las ideas obsoletas encuentran una nueva vida y las tecnologías pasadas se transforman en innovaciones futuras. Es el punto de partida para los visionarios y los revolucionarios.',
        9,
        'https://images.unsplash.com/photo-1540829917886-91ab031b1764?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://dreamlabstorage.blob.core.windows.net/archivos/graveyard.webp',
        1
    ),
    (
        'PCB Factory',
        'Desde prototipos hasta producción en masa, PCB Factory ofrece un entorno especializado para el diseño y la fabricación de placas de circuito impreso. Con equipos de alta precisión y experiencia técnica, cada proyecto encuentra su camino hacia el éxito.',
        10,
        'https://images.unsplash.com/photo-1631376178637-392efc9e356b?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://dreamlabstorage.blob.core.windows.net/archivos/pcb-factory.webp',
        0
    ),
    (
        'Hack-Battlefield',
        'Adéntrate en un campo de pruebas donde la habilidad y la estrategia son tus armas. Hack-Battlefield es el lugar donde los expertos en seguridad informática se enfrentan para poner a prueba sus habilidades y proteger los sistemas de mañana.',
        6,
        'https://images.unsplash.com/photo-1567619363836-e5fd63f69b20?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://dreamlabstorage.blob.core.windows.net/archivos/hack-battlefield.webp',
        0
    ),
    (
        'Testing Land',
        'Un terreno fértil para la innovación y el desarrollo tecnológico. Aquí, los proyectos toman forma y se someten a rigurosas pruebas para garantizar su calidad y fiabilidad. Es el punto de partida para las soluciones del futuro.',
        8,
        'https://images.unsplash.com/photo-1587355760421-b9de3226a046?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://dreamlabstorage.blob.core.windows.net/archivos/testing-land.webp',
        0
    ),
    (
        'War Headquarters',
        'El corazón estratégico de las operaciones tecnológicas avanzadas. War Headquarters es donde se planifican y ejecutan los proyectos más ambiciosos, donde la creatividad se encuentra con la ingeniería para dar forma al futuro de la tecnología.',
        5,
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://dreamlabstorage.blob.core.windows.net/archivos/war-headquarters.webp',
        1
    ),
    (
        'Biometrics Flexible Hall',
        'En un mundo donde la identidad es fundamental, Biometrics Flexible Hall ofrece un entorno adaptable para la investigación y el desarrollo de sistemas biométricos. Desde el reconocimiento facial hasta la autenticación de voz, aquí se están construyendo las soluciones de seguridad del mañana.',
        7,
        'https://images.unsplash.com/photo-1667453466805-75bbf36e8707?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://dreamlabstorage.blob.core.windows.net/archivos/biometrics.webp',
        0
    ),
    (
        'Beyond-Digits',
        'Más allá de los límites convencionales de la tecnología, Beyond-Digits es donde las ideas audaces encuentran su hogar. Aquí, los innovadores exploran nuevas fronteras, desde la inteligencia artificial hasta la computación cuántica, dando forma al futuro con cada línea de código.',
        9,
        'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://dreamlabstorage.blob.core.windows.net/archivos/beyond-digits.webp',
        0
    );

-- Sample data for Experiencias
INSERT INTO
    Experiencias (
        idUF,
        idSala,
        nombre,
        descripcion,
        esAutoDirigida,
        esExclusivaUF,
        portadaURL,
        fechaInicio,
        fechaFin,
        horaFin
    )
VALUES
    (
        null,
        3,
        'Hackers Event',
        'Únete a nosotros para explorar los últimos avances en ciberseguridad y pruebas de software en nuestro evento exclusivo. Aprende de expertos de la industria y participa en debates interactivos sobre técnicas y herramientas de hacking ético.',
        1,
        0,
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '2024-01-01',
        '2024-01-07',
        '18:00:00'
    ),
    (
        null,
        3,
        'Cisco Experience',
        'Sumérgete en el emocionante mundo de la tecnología de red con Cisco Experience. Descubre las últimas innovaciones de Cisco en networking y colaboración, y obtén conocimientos prácticos para impulsar tu carrera en TI.',
        0,
        0,
        'https://images.unsplash.com/photo-1554098415-4052459dc340?q=80&w=1852&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '2024-02-01',
        '2024-02-07',
        '20:00:00'
    ),
    (
        null,
        1,
        'Game jam event',
        '¡Prepárate para un fin de semana lleno de creatividad y diversión en nuestro evento de Game Jam! Únete a otros desarrolladores para crear juegos originales en un entorno colaborativo y emocionante.',
        0,
        0,
        'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?q=80&w=1767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '2024-01-03',
        '2024-01-03',
        '18:00:00'
    ),
    (
        null,
        1,
        'Presentación Apple Vision Pro',
        'Explora las nuevas características y posibilidades de Apple Vision Pro en nuestra presentación exclusiva. Descubre cómo esta tecnología revolucionaria está transformando la forma en que interactuamos con el mundo que nos rodea.',
        0,
        0,
        'https://images.unsplash.com/photo-1698084068220-856ded06c1a4?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '2024-03-01',
        '2024-03-07',
        '20:00:00'
    ),
    (
        null,
        2,
        'Creando tu primer circuito',
        'Únete a nuestro taller práctico y aprende los fundamentos de la electrónica mientras creas tu primer circuito. Desde conceptos básicos hasta proyectos prácticos, este evento es perfecto para principiantes que desean explorar el mundo de la electrónica.',
        1,
        0,
        'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '2024-01-04',
        '2024-01-05',
        '18:00:00'
    ),
    (
        null,
        2,
        'Curso de Swift',
        'Sumérgete en el fascinante mundo de la programación iOS con nuestro curso de Swift. Aprende los fundamentos del lenguaje de programación Swift y desarrolla habilidades prácticas para crear aplicaciones innovadoras y emocionantes para dispositivos Apple.',
        1,
        0,
        'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '2024-01-01',
        '2024-08-02',
        '20:00:00'
    ),
    (
        null,
        1,
        'Experiencia VR',
        '¡Explora el Mundo Virtual: Un Viaje Educativo en Realidad Virtual! Únete a nosotros en nuestra escuela para una experiencia única donde los estudiantes se sumergirán en la magia de la realidad virtual. Desde viajar a lugares exóticos hasta aventurarse en mundos históricos, cada experiencia ofrecerá una nueva perspectiva y un aprendizaje interactivo.',
        1,
        0,
        'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '2024-01-01',
        '2024-08-02',
        '20:00:00'
    ),
    (
        1,
        1,
        'Seguridad en la Red',
        'Aprende los conceptos básicos y avanzados de la seguridad en redes en nuestro taller interactivo. Desde la configuración de firewalls hasta la detección de intrusiones, este evento te preparará para proteger eficazmente tu red contra amenazas cibernéticas.',
        0,
        1,
        'https://images.unsplash.com/photo-1604090898152-3003bd1ae6df?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '2024-01-10',
        '2024-01-14',
        '16:00:00'
    ),
    (
        2,
        2,
        'Taller de Hacking Ético',
        'Explora el mundo del hacking ético en nuestro taller especializado. Aprende técnicas avanzadas de penetración, análisis de vulnerabilidades y más, todo de la mano de expertos en seguridad informática.',
        0,
        1,
        'https://images.unsplash.com/photo-1585079542156-2755d9c8a094?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '2024-01-20',
        '2024-01-24',
        '14:00:00'
    ),
    (
        1,
        3,
        'Introducción a la Programación en Python',
        'Descubre los fundamentos de la programación en Python en nuestro curso introductorio. Desde la sintaxis básica hasta la resolución de problemas prácticos, este evento es perfecto para aquellos que desean iniciarse en el mundo de la programación.',
        0,
        1,
        'https://images.unsplash.com/photo-1660616246653-e2c57d1077b9?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '2024-02-05',
        '2024-02-09',
        '18:00:00'
    ),
    (
        2,
        4,
        'Taller de Desarrollo de Aplicaciones Móviles',
        'Aprende a desarrollar aplicaciones móviles desde cero en nuestro taller práctico. Convierte tus ideas en aplicaciones funcionales utilizando las últimas herramientas y técnicas de desarrollo de aplicaciones.',
        0,
        1,
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '2024-02-15',
        '2024-02-19',
        '16:00:00'
    ),
    (
        1,
        5,
        'Introducción a la Inteligencia Artificial',
        'Descubre los conceptos básicos de la inteligencia artificial en nuestro seminario interactivo. Explora aplicaciones prácticas y aprende cómo la IA está transformando diversas industrias en la actualidad.',
        1,
        1,
        'https://images.unsplash.com/photo-1684369175809-f9642140a1bd?q=80&w=1884&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '2024-02-25',
        '2024-03-01',
        '14:00:00'
    ),
    (
        1,
        6,
        'Taller de Diseño de Experiencia de Usuario',
        'Aprende los principios básicos del diseño de experiencia de usuario en nuestro taller interactivo. Descubre cómo crear interfaces intuitivas y atractivas que mejoren la experiencia del usuario en aplicaciones y sitios web.',
        1,
        1,
        'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '2024-03-05',
        '2024-03-09',
        '12:00:00'
    ),
    (
        1,
        7,
        'Taller de Desarrollo Web Moderno',
        'Sumérgete en el mundo del desarrollo web moderno en nuestro taller intensivo. Aprende las últimas tecnologías y técnicas para crear sitios web dinámicos y responsivos que se destaquen en el panorama digital actual.',
        0,
        1,
        'https://images.unsplash.com/photo-1669023414171-56f0740e34cd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '2024-03-15',
        '2024-03-19',
        '10:00:00'
    ),
    (
        2,
        8,
        'Taller de Machine Learning Práctico',
        'Descubre cómo aplicar el aprendizaje automático en proyectos del mundo real en nuestro taller práctico. Aprende a entrenar modelos, realizar análisis de datos y desarrollar soluciones inteligentes utilizando algoritmos de machine learning.',
        0,
        1,
        'https://images.unsplash.com/photo-1644325349124-d1756b79dd42?q=80&w=1775&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        '2024-03-25',
        '2024-03-29',
        '08:00:00'
    );

-- Sample data for Mesas
INSERT INTO
    Mesas (idSala, cupos)
VALUES
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (2, 2),
    (2, 3),
    (2, 4),
    (2, 8),
    (3, 2),
    (3, 3),
    (3, 4),
    (3, 6),
    (4, 2),
    (4, 3),
    (4, 4),
    (4, 4),
    (5, 2),
    (5, 3),
    (5, 4),
    (5, 10),
    (6, 2),
    (6, 3),
    (6, 4),
    (6, 8),
    (7, 2),
    (7, 3),
    (7, 4),
    (7, 4),
    (8, 2),
    (8, 3),
    (8, 4),
    (8, 9),
    (9, 2),
    (9, 3),
    (9, 4),
    (9, 8),
    (10, 2),
    (10, 3),
    (10, 4),
    (10, 5),
    (11, 2),
    (11, 3),
    (11, 4),
    (11, 10);

-- Sample data for Reservaciones
INSERT INTO
    Reservaciones (
        idUsuario,
        idSala,
        idExperiencia,
        idMesa,
        horaInicio,
        duracion,
        fecha,
        numPersonas,
        estatus
    )
VALUES
    (
        'a01177767',
        2,
        2,
        2,
        '12:00:00',
        3,
        '2024-01-05',
        3,
        3
    ),
    (
        'a00833852',
        1,
        4,
        3,
        '09:00:00',
        1,
        '2024-02-10',
        4,
        3
    ),
    (
        'a00833852',
        1,
        null,
        3,
        '12:00:00',
        3,
        '2024-03-10',
        4,
        3
    ),
    (
        'a00833173',
        4,
        null,
        4,
        '12:00:00',
        3,
        '2024-04-15',
        5,
        3
    ),
    (
        'a00833173',
        5,
        3,
        2,
        '08:00:00',
        2,
        '2024-01-10',
        3,
        3
    ),
    (
        'a01280601',
        1,
        3,
        3,
        '11:00:00',
        2,
        '2024-01-18',
        4,
        3
    ),
    (
        'a01280601',
        5,
        6,
        3,
        '19:00:00',
        2,
        '2024-02-19',
        4,
        3
    ),
    (
        'a01177767',
        2,
        null,
        4,
        '14:00:00',
        1,
        '2024-04-25',
        5,
        3
    );

-- Reservaciones para el lunes
INSERT INTO
    Reservaciones (
        idUsuario,
        idSala,
        idExperiencia,
        idMesa,
        horaInicio,
        duracion,
        fecha,
        numPersonas,
        estatus
    )
VALUES
    (
        'a01177767',
        1,
        null,
        1,
        '10:00:00',
        2,
        '2024-05-27',
        3,
        3
    ),
    (
        'a01280601',
        2,
        null,
        5,
        '13:00:00',
        3,
        '2024-05-27',
        4,
        3
    ),
    (
        'a00833173',
        3,
        null,
        9,
        '09:00:00',
        4,
        '2024-05-27',
        2,
        3
    ),
    (
        'a01412726',
        4,
        null,
        13,
        '11:00:00',
        3,
        '2024-05-27',
        5,
        3
    ),
    (
        'a00829814',
        5,
        null,
        17,
        '14:00:00',
        2,
        '2024-05-27',
        3,
        3
    ),
    (
        'a00833852',
        6,
        null,
        21,
        '10:00:00',
        1,
        '2024-05-27',
        4,
        3
    );

-- Reservaciones para el martes
INSERT INTO
    Reservaciones (
        idUsuario,
        idSala,
        idExperiencia,
        idMesa,
        horaInicio,
        duracion,
        fecha,
        numPersonas,
        estatus
    )
VALUES
    (
        'a01177767',
        1,
        null,
        2,
        '10:00:00',
        2,
        '2024-05-28',
        3,
        3
    ),
    (
        'a01280601',
        2,
        null,
        6,
        '13:00:00',
        2,
        '2024-05-28',
        4,
        3
    ),
    (
        'a00833173',
        3,
        null,
        10,
        '09:00:00',
        4,
        '2024-05-28',
        2,
        3
    ),
    (
        'a01412726',
        4,
        null,
        14,
        '11:00:00',
        2,
        '2024-05-28',
        5,
        3
    ),
    (
        'a00829814',
        5,
        null,
        18,
        '14:00:00',
        4,
        '2024-05-28',
        3,
        3
    ),
    (
        'a00833852',
        6,
        null,
        22,
        '10:00:00',
        1,
        '2024-05-28',
        4,
        3
    );

-- Reservaciones para el miércoles
INSERT INTO
    Reservaciones (
        idUsuario,
        idSala,
        idExperiencia,
        idMesa,
        horaInicio,
        duracion,
        fecha,
        numPersonas,
        estatus
    )
VALUES
    (
        'a01177767',
        1,
        null,
        1,
        '10:00:00',
        3,
        '2024-05-29',
        3,
        3
    ),
    (
        'a01280601',
        2,
        null,
        5,
        '13:00:00',
        2,
        '2024-05-29',
        4,
        3
    ),
    (
        'a00833173',
        3,
        null,
        9,
        '09:00:00',
        3,
        '2024-05-29',
        2,
        3
    ),
    (
        'a01412726',
        4,
        null,
        13,
        '11:00:00',
        2,
        '2024-05-29',
        5,
        3
    ),
    (
        'a00829814',
        5,
        null,
        17,
        '14:00:00',
        2,
        '2024-05-29',
        3,
        3
    ),
    (
        'a00833852',
        6,
        null,
        21,
        '10:00:00',
        1,
        '2024-05-29',
        4,
        3
    );

-- Reservaciones para el jueves
INSERT INTO
    Reservaciones (
        idUsuario,
        idSala,
        idExperiencia,
        idMesa,
        horaInicio,
        duracion,
        fecha,
        numPersonas,
        estatus
    )
VALUES
    (
        'a01177767',
        1,
        null,
        3,
        '10:00:00',
        4,
        '2024-05-30',
        3,
        3
    ),
    (
        'a01280601',
        2,
        null,
        7,
        '13:00:00',
        2,
        '2024-05-30',
        4,
        3
    ),
    (
        'a00833173',
        3,
        null,
        11,
        '09:00:00',
        1,
        '2024-05-30',
        2,
        3
    ),
    (
        'a01412726',
        4,
        null,
        15,
        '11:00:00',
        3,
        '2024-05-30',
        5,
        3
    ),
    (
        'a00829814',
        5,
        null,
        19,
        '14:00:00',
        3,
        '2024-05-30',
        3,
        3
    ),
    (
        'a00833852',
        6,
        null,
        23,
        '10:00:00',
        4,
        '2024-05-30',
        4,
        3
    );

-- Reservaciones para el viernes
INSERT INTO
    Reservaciones (
        idUsuario,
        idSala,
        idExperiencia,
        idMesa,
        horaInicio,
        duracion,
        fecha,
        numPersonas,
        estatus
    )
VALUES
    (
        'a01177767',
        1,
        null,
        2,
        '11:00:00',
        2,
        '2024-05-31',
        3,
        3
    ),
    (
        'a01280601',
        2,
        null,
        6,
        '13:00:00',
        2,
        '2024-05-31',
        4,
        3
    ),
    (
        'a00833173',
        3,
        null,
        10,
        '09:00:00',
        4,
        '2024-05-31',
        2,
        3
    ),
    (
        'a01412726',
        4,
        null,
        14,
        '16:00:00',
        2,
        '2024-05-31',
        5,
        3
    ),
    (
        'a00829814',
        5,
        null,
        18,
        '14:00:00',
        4,
        '2024-05-31',
        3,
        3
    ),
    (
        'a00833852',
        6,
        null,
        22,
        '13:00:00',
        1,
        '2024-05-31',
        4,
        3
    );

-- Reservaciones video wall
INSERT INTO
    Reservaciones (
        idUsuario,
        idSala,
        idExperiencia,
        idMesa,
        horaInicio,
        duracion,
        fecha,
        numPersonas,
        estatus
    )
VALUES
    (
        'a01177767',
        1,
        null,
        3,
        '18:00:00',
        2,
        '2024-05-28',
        3,
        3
    ),
    (
        'a00833173',
        2,
        null,
        7,
        '13:00:00',
        2,
        '2024-05-28',
        4,
        3
    ),
    (
        'A01412726',
        3,
        null,
        11,
        '09:00:00',
        4,
        '2024-05-28',
        2,
        3
    ),
    (
        'a00833852',
        4,
        null,
        15,
        '11:00:00',
        2,
        '2024-05-28',
        5,
        3
    ),
    (
        'a00829814',
        5,
        null,
        19,
        '18:00:00',
        2,
        '2024-05-28',
        3,
        3
    ),
    (
        'a01280601',
        6,
        null,
        23,
        '17:00:00',
        1,
        '2024-05-28',
        4,
        3
    );

-- Sample data for ReservacionesMateriales
INSERT INTO
    ReservacionesMateriales (idReservacion, idMaterial, cantidad, estatus)
VALUES
    (1, 1, 5, 1),
    (2, 2, 3, 2);

-- Sample data for MaterialesSalas
INSERT INTO
    MaterialesSalas (idSala, idMaterial, cantidad)
VALUES
    (1, 1, 10), -- Laptop Gamer para Electric Garage (10 unidades)
    (1, 2, 2), -- Surface Pro para Electric Garage (2 unidades)
    (1, 3, 3), -- Chromebook para Electric Garage (3 unidades)
    (1, 5, 2), -- Oculus Quest 2 para Electric Garage (2 unidades)
    (1, 6, 1), -- Visor VR para smartphone para Electric Garage (1 unidad)
    (1, 7, 1), -- PC de escritorio para Electric Garage (1 unidad)
    (1, 9, 1), -- Cámara Digital (DSLR) para Electric Garage (1 unidad)
    (1, 10, 1), -- Tablet iPad para Electric Garage (1 unidad)
    (1, 11, 1), -- Tablet Windows para Electric Garage (1 unidad)
    (1, 12, 2), -- Altavoces Bluetooth para Electric Garage (2 unidades)
    (1, 13, 1), -- Micrófono para Electric Garage (1 unidad)
    (1, 14, 1), -- Router Wi-Fi para Electric Garage (1 unidad)
    (1, 15, 1), -- Cable Ethernet para Electric Garage (1 unidad)
    (1, 16, 1), -- Tarjeta de Red para Electric Garage (1 unidad)
    (2, 6, 6), -- HTC Vive Pro 2 para Dimension Forge (6 unidades)
    (2, 7, 2), -- PlayStation VR para Dimension Forge (2 unidades)
    (2, 1, 4), -- Laptop Gamer para Dimension Forge (4 unidades)
    (2, 3, 2), -- Chromebook para Dimension Forge (2 unidades)
    (2, 10, 2), -- Tablet Android para Dimension Forge (2 unidades)
    (2, 12, 1), -- Tablet iPad para Dimension Forge (1 unidad)
    (2, 11, 1), -- Tablet Windows para Dimension Forge (1 unidad)
    (2, 13, 1), -- Micrófono para Dimension Forge (1 unidad)
    (2, 14, 1), -- Router Wi-Fi para Dimension Forge (1 unidad)
    (2, 15, 1), -- Cable Ethernet para Dimension Forge (1 unidad)
    (2, 16, 1), -- Tarjeta de Red para Dimension Forge (1 unidad)
    (3, 5, 3), -- Oculus Quest 2 para New Horizons (3 unidades)
    (3, 6, 2), -- Visor VR para smartphone para New Horizons (2 unidades)
    (3, 7, 2), -- PC de escritorio para New Horizons (2 unidades)
    (3, 9, 3), -- Cámara Digital (DSLR) para New Horizons (3 unidades)
    (3, 10, 2), -- Tablet Android para New Horizons (2 unidades)
    (3, 11, 1), -- Tablet Windows para New Horizons (1 unidad)
    (3, 12, 1), -- Altavoces Bluetooth para New Horizons (1 unidad)
    (3, 13, 1), -- Micrófono para New Horizons (1 unidad)
    (3, 14, 1), -- Router Wi-Fi para New Horizons (1 unidad)
    (3, 15, 1), -- Cable Ethernet para New Horizons (1 unidad)
    (3, 16, 1), -- Tarjeta de Red para New Horizons (1 unidad)
    (4, 1, 6), -- Laptop Gamer para Deep Net (6 unidades)
    (4, 2, 2), -- Surface Pro para Deep Net (2 unidades)
    (4, 3, 2), -- Chromebook para Deep Net (2 unidades)
    (4, 5, 2), -- Oculus Quest 2 para Deep Net (2 unidades)
    (4, 6, 1), -- Visor VR para smartphone
    (4, 7, 1), -- PC de escritorio para Deep Net (1 unidad)
    (4, 9, 1), -- Cámara Digital (DSLR) para Deep Net (1 unidad)
    (4, 12, 1), -- Tablet iPad para Deep Net (1 unidad)
    (4, 11, 1), -- Tablet Windows para Deep Net (1 unidad)
    (4, 13, 1), -- Micrófono para Deep Net (1 unidad)
    (4, 14, 1), -- Router Wi-Fi para Deep Net (1 unidad)
    (4, 15, 1), -- Cable Ethernet para Deep Net (1 unidad)
    (4, 16, 1), -- Tarjeta de Red para Deep Net (1 unidad)
    (5, 2, 5), -- HTC Vive Pro 2 para Graveyard (5 unidades)
    (5, 7, 2), -- PlayStation VR para Graveyard (2 unidades)
    (5, 1, 4), -- Laptop Gamer para Graveyard (4 unidades)
    (5, 3, 1), -- Chromebook para Graveyard (1 unidad)
    (5, 5, 1), -- Oculus Quest 2 para Graveyard (1 unidad)
    (5, 6, 1), -- Visor VR para smartphone para Graveyard (1 unidad)
    (5, 9, 1), -- Cámara Digital (DSLR) para Graveyard (1 unidad)
    (5, 12, 1), -- Tablet iPad para Graveyard (1 unidad)
    (5, 11, 1), -- Tablet Windows para Graveyard (1 unidad)
    (5, 13, 1), -- Micrófono para Graveyard (1 unidad)
    (5, 14, 1), -- Router Wi-Fi para Graveyard (1 unidad)
    (5, 15, 1), -- Cable Ethernet para Graveyard (1 unidad)
    (5, 16, 1), -- Tarjeta de Red para Graveyard (1 unidad)
    (6, 5, 5), -- Oculus Quest 2 para PCB Factory (5 unidades)
    (6, 1, 4), -- Laptop Gamer para PCB Factory (4 unidades)
    (6, 2, 2), -- Surface Pro para PCB Factory (2 unidades)
    (6, 3, 1), -- Chromebook para PCB Factory (1 unidad)
    (6, 6, 1), -- HTC Vive Pro 2 para PCB Factory (1 unidad)
    (6, 7, 1), -- PlayStation VR para PCB Factory (1 unidad)
    (6, 9, 1), -- Cámara Digital (DSLR) para PCB Factory (1 unidad)
    (6, 12, 1), -- Tablet iPad para PCB Factory (1 unidad)
    (6, 11, 1), -- Tablet Windows para PCB Factory (1 unidad)
    (6, 13, 1), -- Micrófono para PCB Factory (1 unidad)
    (6, 14, 1), -- Router Wi-Fi para PCB Factory (1 unidad)
    (6, 15, 1), -- Cable Ethernet para PCB Factory (1 unidad)
    (6, 16, 1), -- Tarjeta de Red para PCB Factory (1 unidad)
    (7, 1, 3), -- Laptop Gamer para Hack-Battlefield (3 unidades)
    (7, 2, 2), -- Surface Pro para Hack-Battlefield (2 unidades)
    (7, 3, 1), -- Chromebook para Hack-Battlefield (1 unidad)
    (7, 6, 2), -- HTC Vive Pro 2 para Hack-Battlefield (2 unidades)
    (7, 7, 2), -- PlayStation VR para Hack-Battlefield (2 unidades)
    (7, 9, 1), -- Cámara Digital (DSLR) para Hack-Battlefield (1 unidad)
    (7, 12, 1), -- Tablet iPad para Hack-Battlefield (1 unidad)
    (7, 11, 1), -- Tablet Windows para Hack-Battlefield (1 unidad)
    (7, 13, 1), -- Micrófono para Hack-Battlefield (1 unidad)
    (7, 14, 1), -- Router Wi-Fi para Hack-Battlefield (1 unidad)
    (7, 15, 1), -- Cable Ethernet para Hack-Battlefield (1 unidad)
    (7, 16, 1), -- Tarjeta de Red para Hack-Battlefield (1 unidad)
    (8, 1, 5), -- Laptop Gamer para Testing Land (5 unidades)
    (8, 2, 2), -- Surface Pro para Testing Land (2 unidades)
    (8, 3, 1), -- Chromebook para Testing Land (1 unidad)
    (8, 5, 2), -- Oculus Quest 2 para Testing Land (2 unidades)
    (8, 6, 2), -- Visor VR para smartphone para Testing Land (2 unidades)
    (8, 7, 1), -- PC de escritorio para Testing Land (1 unidad)
    (8, 9, 1), -- Cámara Digital (DSLR) para Testing Land (1 unidad)
    (8, 12, 1), -- Tablet iPad para Testing Land (1 unidad)
    (8, 11, 1), -- Tablet Windows para Testing Land (1 unidad)
    (8, 13, 1), -- Micrófono para Testing Land (1 unidad)
    (8, 14, 1), -- Router Wi-Fi para Testing Land (1 unidad)
    (8, 15, 1), -- Cable Ethernet para Testing Land (1 unidad)
    (8, 16, 1), -- Tarjeta de Red para Testing Land (1 unidad)
    (9, 1, 7), -- Laptop Gamer para War Headquarters (7 unidades)
    (9, 2, 2), -- Surface Pro para War Headquarters (2 unidades)
    (9, 3, 2), -- Chromebook para War Headquarters (2 unidades)
    (9, 5, 1), -- Oculus Quest 2 para War Headquarters (1 unidad)
    (9, 6, 1), -- Visor VR para smartphone para War Headquarters (1 unidad)
    (9, 7, 1), -- PC de escritorio para War Headquarters (1 unidad)
    (9, 9, 1), -- Cámara Digital (DSLR) para War Headquarters (1 unidad)
    (9, 12, 1), -- Tablet iPad para War Headquarters (1 unidad)
    (9, 11, 1), -- Tablet Windows para War Headquarters (1 unidad)
    (9, 13, 1), -- Micrófono para War Headquarters (1 unidad)
    (9, 14, 1), -- Router Wi-Fi para War Headquarters (1 unidad)
    (9, 15, 1), -- Cable Ethernet para War Headquarters (1 unidad)
    (9, 16, 1), -- Tarjeta de Red para War Headquarters (1 unidad)
    (10, 1, 9), -- Laptop Gamer para Biometrics Flexible Hall (9 unidades)
    (10, 2, 2), -- Surface Pro para Biometrics Flexible Hall (2 unidades)
    (10, 3, 1), -- Chromebook para Biometrics Flexible Hall (1 unidad)
    (10, 5, 1), -- Oculus Quest 2 para Biometrics Flexible Hall (1 unidad)
    (10, 6, 1), -- Visor VR para smartphone para Biometrics Flexible Hall (1 unidad)
    (10, 7, 1), -- PC de escritorio para Biometrics Flexible Hall (1 unidad)
    (10, 9, 2), -- Cámara Digital (DSLR) para Biometrics Flexible Hall (2 unidades)
    (10, 10, 3), -- Tablet Android para Biometrics Flexible Hall (3 unidades)
    (10, 11, 1), -- Tablet Windows para Biometrics Flexible Hall (1 unidad)
    (10, 12, 1), -- Altavoces Bluetooth para Biometrics Flexible Hall (1 unidad)
    (10, 13, 1), -- Micrófono para Biometrics Flexible Hall (1 unidad)
    (10, 14, 1), -- Router Wi-Fi para Biometrics Flexible Hall (1 unidad)
    (10, 15, 1), -- Cable Ethernet para Biometrics Flexible Hall (1 unidad)
    (10, 16, 1), -- Tarjeta de Red para Biometrics Flexible Hall (1 unidad)
    (11, 1, 11), -- Laptop Gamer para Beyond-Digits (11 unidades)
    (11, 2, 2), -- Surface Pro para Beyond-Digits (2 unidades)
    (11, 3, 1), -- Chromebook para Beyond-Digits (1 unidad)
    (11, 5, 2), -- Oculus Quest 2 para Beyond-Digits (2 unidades)
    (11, 6, 1), -- Visor VR para smartphone para Beyond-Digits (1 unidad)
    (11, 7, 1), -- PC de escritorio para Beyond-Digits (1 unidad)
    (11, 9, 1), -- Cámara Digital (DSLR) para Beyond-Digits (1 unidad)
    (11, 10, 2), -- Tablet Android para Beyond-Digits (2 unidades)
    (11, 11, 1), -- Tablet Windows para Beyond-Digits (1 unidad)
    (11, 12, 1), -- Altavoces Bluetooth para Beyond-Digits (1 unidad)
    (11, 13, 1), -- Micrófono para Beyond-Digits (1 unidad)
    (11, 14, 1), -- Router Wi-Fi para Beyond-Digits (1 unidad)
    (11, 15, 1), -- Cable Ethernet para Beyond-Digits (1 unidad)
    (11, 16, 1);

-- Tarjeta de Red para Beyond-Digits (1 unidad)
-- Sample data for MaterialesRecomendados
INSERT INTO
    MaterialesRecomendados (idExperiencia, idMaterial, cantidad)
VALUES
    (1, 5, 2), -- Hackers Event, Oculus Quest en New Horizons (Probar cuando hay suficientes materiales)
    (3, 6, 2), -- GameJam Event, Chromebook en Electric Garage (Probar cuando no hay suficientes materiales)
    (5, 2, 1); -- Creando tu primer circuito, Surface Pro en Dimension Forge (Probar cuando ya no hay disponibilidad del material)

---------------------------------------------------------------
--                                                           --
--  ********** DATOS DE PRUEBA PARA EL DASHBOARD **********  --
--                                                           --
---------------------------------------------------------------
--
-- RESERVACIONES
-- 
-- Reservaciones previas: ~44
--
-------------------------------------------
INSERT INTO
    Reservaciones (
        idUsuario,
        idSala,
        idExperiencia,
        idMesa,
        horaInicio,
        duracion,
        fecha,
        numPersonas,
        estatus
    )
VALUES
    ------------------------------
    -- Enero (10) ~54
    ------------------------------
    (
        'a01177767',
        1,
        1,
        null,
        '12:00:00',
        2,
        '2024-01-05',
        3,
        3
    ),
    (
        'a01177767',
        1,
        1,
        null,
        '12:00:00',
        2,
        '2024-01-05',
        3,
        3
    ),
    (
        'a01177767',
        1,
        1,
        null,
        '12:00:00',
        2,
        '2024-01-05',
        3,
        3
    ),
    (
        'a01177767',
        2,
        1,
        null,
        '12:00:00',
        2,
        '2024-01-05',
        3,
        3
    ),
    (
        'a01177767',
        2,
        1,
        null,
        '12:00:00',
        2,
        '2024-01-05',
        3,
        3
    ),
    (
        'a01177767',
        2,
        1,
        null,
        '12:00:00',
        2,
        '2024-01-05',
        3,
        3
    ),
    (
        'a01177767',
        2,
        1,
        null,
        '12:00:00',
        2,
        '2024-01-05',
        3,
        3
    ),
    (
        'a01177767',
        3,
        1,
        null,
        '12:00:00',
        2,
        '2024-01-05',
        3,
        4
    ),
    (
        'a01177767',
        3,
        1,
        null,
        '12:00:00',
        2,
        '2024-01-05',
        3,
        4
    ),
    (
        'a01177767',
        4,
        1,
        null,
        '12:00:00',
        2,
        '2024-01-05',
        3,
        4
    ),
    ------------------------------
    -- Febrero (20) ~74
    ------------------------------
    (
        'a01177767',
        3,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        3
    ),
    (
        'a01177767',
        1,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        3
    ),
    (
        'a01177767',
        4,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        3
    ),
    (
        'a01177767',
        5,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        3
    ),
    (
        'a01177767',
        5,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        3
    ),
    (
        'a01177767',
        5,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        3
    ),
    (
        'a01177767',
        5,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        3
    ),
    (
        'a01177767',
        5,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        3
    ),
    (
        'a01177767',
        5,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        3
    ),
    (
        'a01177767',
        6,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        3
    ),
    (
        'a01177767',
        6,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        3
    ),
    (
        'a01177767',
        6,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        3
    ),
    (
        'a01177767',
        6,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        3
    ),
    (
        'a01177767',
        7,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        3
    ),
    (
        'a01177767',
        7,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        4
    ),
    (
        'a01177767',
        7,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        4
    ),
    (
        'a01177767',
        7,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        4
    ),
    (
        'a01177767',
        7,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        4
    ),
    (
        'a01177767',
        7,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        4
    ),
    (
        'a01177767',
        8,
        1,
        null,
        '12:00:00',
        2,
        '2024-02-05',
        3,
        4
    ),
    ------------------------------
    -- Marzo (9) ~83
    ------------------------------
    (
        'a01177767',
        1,
        1,
        null,
        '12:00:00',
        2,
        '2024-03-05',
        3,
        3
    ),
    (
        'a01177767',
        1,
        1,
        null,
        '12:00:00',
        2,
        '2024-03-05',
        3,
        3
    ),
    (
        'a01177767',
        2,
        1,
        null,
        '12:00:00',
        2,
        '2024-03-05',
        3,
        3
    ),
    (
        'a01177767',
        2,
        1,
        null,
        '12:00:00',
        2,
        '2024-03-05',
        3,
        3
    ),
    (
        'a01177767',
        2,
        1,
        null,
        '12:00:00',
        2,
        '2024-03-05',
        3,
        3
    ),
    (
        'a01177767',
        3,
        1,
        null,
        '12:00:00',
        2,
        '2024-03-05',
        3,
        3
    ),
    (
        'a01177767',
        4,
        1,
        null,
        '12:00:00',
        2,
        '2024-03-05',
        3,
        3
    ),
    (
        'a01177767',
        8,
        1,
        null,
        '12:00:00',
        2,
        '2024-03-05',
        3,
        4
    ),
    (
        'a01177767',
        8,
        1,
        null,
        '12:00:00',
        2,
        '2024-03-05',
        3,
        4
    ),
    ------------------------------
    -- Abril (27) ~110
    ------------------------------
    (
        'a01177767',
        1,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        1,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        1,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        2,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        3,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        3,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        3,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        4,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        4,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        5,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        5,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        5,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        5,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        6,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        6,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        6,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        7,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        7,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        8,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        9,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        3
    ),
    (
        'a01177767',
        10,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        4
    ),
    (
        'a01177767',
        10,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        4
    ),
    (
        'a01177767',
        10,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        4
    ),
    (
        'a01177767',
        10,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        4
    ),
    (
        'a01177767',
        10,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        4
    ),
    (
        'a01177767',
        11,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        4
    ),
    (
        'a01177767',
        11,
        1,
        null,
        '12:00:00',
        2,
        '2024-04-05',
        3,
        4
    ),
    ------------------------------
    -- Mayo (4) ~114
    ------------------------------
    (
        'a01177767',
        1,
        1,
        null,
        '12:00:00',
        2,
        '2024-05-01',
        3,
        3
    ),
    (
        'a01177767',
        1,
        1,
        null,
        '12:00:00',
        2,
        '2024-05-05',
        3,
        3
    ),
    (
        'a01177767',
        2,
        1,
        null,
        '12:00:00',
        2,
        '2024-05-05',
        3,
        4
    ),
    (
        'a01177767',
        2,
        1,
        null,
        '12:00:00',
        2,
        '2024-05-05',
        3,
        4
    ),
    ------------------------------
    -- Junio (10) ~124
    ------------------------------
    (
        'a01177767',
        6,
        1,
        null,
        '12:00:00',
        2,
        '2024-06-05',
        3,
        3
    ),
    (
        'a01177767',
        11,
        1,
        null,
        '12:00:00',
        2,
        '2024-06-05',
        3,
        3
    ),
    (
        'a01177767',
        6,
        1,
        null,
        '12:00:00',
        2,
        '2024-06-05',
        3,
        3
    ),
    (
        'a01177767',
        7,
        1,
        null,
        '12:00:00',
        2,
        '2024-06-05',
        3,
        3
    ),
    (
        'a01177767',
        5,
        1,
        null,
        '12:00:00',
        2,
        '2024-06-05',
        3,
        3
    ),
    (
        'a01177767',
        5,
        1,
        null,
        '12:00:00',
        2,
        '2024-06-05',
        3,
        3
    ),
    (
        'a01177767',
        2,
        1,
        null,
        '12:00:00',
        2,
        '2024-06-05',
        3,
        3
    ),
    (
        'a01177767',
        1,
        1,
        null,
        '12:00:00',
        2,
        '2024-06-05',
        3,
        3
    ),
    (
        'a01177767',
        9,
        1,
        null,
        '12:00:00',
        2,
        '2024-06-05',
        3,
        3
    ),
    (
        'a01177767',
        11,
        1,
        null,
        '12:00:00',
        2,
        '2024-06-05',
        3,
        4
    );

-------------------------------------------
--
-- MATERIALES
--
-------------------------------------------
INSERT INTO
    ReservacionesMateriales (idReservacion, idMaterial, cantidad, estatus)
VALUES
    (50, 17, 1, 1),
    (50, 1, 2, 1),
    (50, 18, 1, 1),
    (50, 3, 2, 1),
    (50, 7, 1, 1),
    (50, 13, 3, 1),
    (50, 16, 3, 1),
    (65, 17, 3, 1),
    (65, 11, 1, 1),
    (65, 5, 2, 1),
    (65, 2, 3, 1),
    (65, 18, 1, 1),
    (65, 15, 2, 1),
    (65, 6, 3, 1),
    (80, 12, 3, 1),
    (80, 15, 1, 1),
    (80, 17, 3, 1),
    (80, 8, 2, 1),
    (100, 6, 3, 1),
    (100, 18, 2, 1),
    (100, 8, 1, 1),
    (111, 17, 1, 1),
    (111, 3, 1, 1),
    (111, 7, 3, 1),
    (111, 18, 1, 1),
    (111, 15, 3, 1),
    (111, 1, 1, 1),
    (111, 10, 3, 1),
    (111, 13, 2, 1),
    (111, 16, 3, 1),
    (111, 14, 3, 1),
    (118, 11, 1, 1),
    (118, 14, 1, 1),
    (118, 16, 1, 1),
    (118, 13, 1, 1),
    (118, 9, 3, 1),
    (118, 8, 3, 1);

-------------------------------------------
--
-- PENALIZACIONES
--
-------------------------------------------
INSERT INTO
    HistorialPrioridad (idUsuario, fecha, prioridad, motivo)
VALUES
    ('A01177767', '2024-01-05', -1, null),
    ('A01177767', '2024-01-05', -1, null),
    ('A01177767', '2024-01-05', -1, null),
    ('A01177767', '2024-01-05', -1, null),
    ('A01177767', '2024-02-05', -1, null),
    ('A01177767', '2024-02-05', -1, null),
    ('A01177767', '2024-03-05', -1, null),
    ('A01177767', '2024-03-05', -1, null),
    ('A01177767', '2024-03-05', -1, null),
    ('A01177767', '2024-03-05', -1, null),
    ('A01177767', '2024-03-05', -1, null),
    ('A01177767', '2024-03-05', -1, null),
    ('A01177767', '2024-04-05', -1, null),
    ('A01177767', '2024-04-05', -1, null),
    ('A01177767', '2024-04-05', -1, null),
    ('A01177767', '2024-04-05', -1, null),
    ('A01177767', '2024-05-05', -1, null),
    ('A01177767', '2024-05-05', -1, null),
    ('A01177767', '2024-05-05', -1, null);
