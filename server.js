const express = require('express');
const multer = require('multer');
const path = require('path');

// Crear una nueva instancia de Express
const app = express();

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Usar un nombre único para cada archivo
  }
});

// Configuración de Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // Límite de tamaño de archivo (2 GB)
}).single('video'); // 'video' es el nombre del campo en el formulario

// Ruta para subir el video
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      // Si hay un error (por ejemplo, archivo demasiado grande)
      if (err instanceof multer.MulterError) {
        return res.status(400).send(`Error de carga de archivo: ${err.message}`);
      }
      // Otro tipo de error
      return res.status(500).send('Error al subir el archivo');
    }
    // Si todo está bien
    res.status(200).send({
      message: 'Video subido correctamente',
      file: req.file,
    });
  });
});

// Servir archivos estáticos (opcional, si deseas ver los videos subidos)
app.use('/uploads', express.static('uploads'));

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor funcionando en http://localhost:3000');
});
