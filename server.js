const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Configuración de Multer para permitir archivos grandes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
  }
});

// Aumenta el tamaño máximo permitido para los archivos (por ejemplo, 2 GB)
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 } // 2 GB en bytes
});

app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send(`Archivo ${req.file.originalname} subido correctamente.`);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
