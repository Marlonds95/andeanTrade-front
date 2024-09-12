const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8085;

app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost', // o el host donde está tu servidor MySQL
  user: 'root', // tu usuario de MySQL
  password: '', // tu contraseña de MySQL
  database: 'reparacionesdb' // tu base de datos
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para manejar el envío del formulario
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Consulta para insertar los datos en la base de datos
  const query = 'INSERT INTO contactos (nombre, correo, mensaje) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error al insertar datos:', err);
      res.status(500).send('Error en el servidor');
    } else {
      res.status(200).send('Datos enviados con éxito');
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
