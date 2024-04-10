import express from 'express';
import { spawn } from 'child_process';

const router = express.Router();

router.post('/', (req, res) => {
    try {
        const { prompt } = req.body;
        console.log(prompt);
        // Ejecuta el script Python como un proceso secundario
        const pythonProcess = spawn('python', ['ChatbotRecomendaciones.py', prompt]);

        let responseData = '';

        // Captura la salida del proceso secundario
        pythonProcess.stdout.on('data', (data) => {
            console.log('Datos del chatbot: ${data}');
            responseData += data;
        });

        // Maneja errores del proceso secundario
        pythonProcess.stderr.on('data', (data) => {
            console.error('Error del chatbot: ${data}');
            res.status(500).json({ error: 'Error en el chatbot' });
        });

        // Finaliza el proceso y envía la respuesta una vez que haya terminado
        pythonProcess.on('close', (code) => {
            console.log('Proceso de chatbot finalizado con código ${code}');
            res.status(200).json({ processed_text: responseData.toString() });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;

