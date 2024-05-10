const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost', // Cambia esto si tu base de datos está en un servidor diferente
  user: 'redis',
  password: 'redis',
  database: 'employees' // El nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect(function(err) {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión establecida con la base de datos');
});

// Ejemplo de consulta
connection.query('SELECT * FROM employees', function(err, results, fields) {
  if (err) {
    console.error('Error al ejecutar la consulta:', err);
    return;
  }
  console.log('Resultados de la consulta:', results);
});

// Cerrar la conexión cuando hayas terminado
connection.end();
