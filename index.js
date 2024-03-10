import express from 'express';
import { config } from './config.js';
import Database from './database.js';

// Import App routes
// import person from './person.js';
// import openapi from './openapi.js';
import usuarios from './controllers/usuarios.js';
import reservaciones from './controllers/reservaciones.js';

const port = process.env.PORT || 3000;

const app = express();

app.use('/usuarios', usuarios);
app.use('/reservaciones', reservaciones);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});