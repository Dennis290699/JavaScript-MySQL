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

 // Función para cargar los empleados desde el servidor y mostrarlos en la tabla
 function loadEmployees() {
  fetch('/employees') // Ruta de tu servidor Node.js que devuelve los empleados
      .then(response => response.json())
      .then(data => {
          const tableBody = document.getElementById('employeeTableBody');
          tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar los nuevos datos
          data.forEach(employee => {
              const row = document.createElement('tr');
              row.innerHTML = `
          <td>${employee.emp_no}</td>
          <td>${employee.first_name}</td>
          <td>${employee.last_name}</td>
          <td>${employee.birth_date}</td>
          <td>${employee.hire_date}</td>
          <td>
              <button onclick="editEmployee(${employee.emp_no})">Editar</button>
              <button onclick="deleteEmployee(${employee.emp_no})">Eliminar</button>
          </td>
      `;
              tableBody.appendChild(row);
          });
      })
      .catch(error => console.error('Error al cargar los empleados:', error));
}

// Función para agregar un nuevo empleado
document.getElementById('addEmployeeForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  fetch('/employees', {
      method: 'POST',
      body: formData
  })
      .then(response => response.json())
      .then(data => {
          console.log('Empleado agregado:', data);
          loadEmployees(); // Recargar la tabla después de agregar un nuevo empleado
      })
      .catch(error => console.error('Error al agregar el empleado:', error));
});

// Función para eliminar un empleado
function deleteEmployee(empNo) {
  fetch(`/employees/${empNo}`, {
      method: 'DELETE'
  })
      .then(response => response.json())
      .then(data => {
          console.log('Empleado eliminado:', data);
          loadEmployees(); // Recargar la tabla después de eliminar un empleado
      })
      .catch(error => console.error('Error al eliminar el empleado:', error));
}

// Función para editar un empleado (debes implementarla según tus necesidades)
function editEmployee(empNo) {
  // Aquí puedes implementar la lógica para editar un empleado
}

// Cargar los empleados al cargar la página
window.addEventListener('load', loadEmployees);
