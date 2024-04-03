# API de Gestión de Usuarios con Express

Este proyecto implementa una API REST para la gestión de usuarios utilizando Express.js. La clase `UsersManager` se encarga de administrar los usuarios, permitiendo crear, leer, actualizar y eliminar usuarios, con persistencia de datos en archivos utilizando el módulo `fs`.

## Funcionamiento de la API
La API ofrece los siguientes endpoints:

POST /api/users: Crea un nuevo usuario.
GET /api/users: Obtiene todos los usuarios o filtra por rol si se proporciona el parámetro role.
GET /api/users/:uid: Obtiene un usuario específico por su ID.
PUT /api/users/:uid: Actualiza los datos de un usuario existente.
DELETE /api/users/:uid: Elimina un usuario existente por su ID.
Cómo probar la API con Postman
Creación de un nuevo usuario:

Abre Postman.

Selecciona el método POST.

Ingresa la URL: http://localhost:8080/api/users.

Selecciona la pestaña "Body" y elige "Raw" como tipo de cuerpo.

Ingresa los datos del nuevo usuario en formato JSON en el cuerpo de la solicitud. Por ejemplo:

{
  "email": "example@example.com",
  "password": "password123",
  "role": 0
}

Haz clic en "Send" para enviar la solicitud y crear el usuario.

Obtención de todos los usuarios:

Selecciona el método GET.
Ingresa la URL: http://localhost:8080/api/users.
Haz clic en "Send" para obtener todos los usuarios.
Obtención de un usuario específico:

Selecciona el método GET.
Ingresa la URL: http://localhost:8080/api/users/:uid, donde :uid es el ID del usuario que deseas obtener.
Haz clic en "Send" para obtener el usuario específico.
Actualización de un usuario existente:

Selecciona el método PUT.

Ingresa la URL: http://localhost:8080/api/users/:uid, donde :uid es el ID del usuario que deseas actualizar.

Selecciona la pestaña "Body" y elige "Raw" como tipo de cuerpo.

Ingresa los datos actualizados del usuario en formato JSON en el cuerpo de la solicitud. Por ejemplo:

{
  "email": "new@example.com"
}

Haz clic en "Send" para actualizar el usuario.

Eliminación de un usuario existente:

Selecciona el método DELETE.
Ingresa la URL: http://localhost:8080/api/users/:uid, donde :uid es el ID del usuario que deseas eliminar.
Haz clic en "Send" para eliminar el usuario.




