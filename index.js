import express from 'express';

// Import App routes
import usuarios from './controllers/usuarios.js';
import reservaciones from './controllers/reservaciones.js';
import experiencias from './controllers/experiencias.js';

const port = process.env.PORT || 3000;

const app = express();

app.use('/usuarios', usuarios);
app.use('/reservaciones', reservaciones);
app.use('/experiencias', experiencias);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});