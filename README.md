to merge a Master BACKEND CODERHOUSE

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


Administrador de Productos
El Administrador de Productos es una aplicación que permite gestionar productos a través de operaciones básicas como crear, leer, actualizar y eliminar productos. Utiliza un archivo JSON para almacenar los datos de los productos y se comunica con una API REST para exponer estas funcionalidades. Además, garantiza que cada producto tenga un título único y proporciona valores predeterminados para campos como la foto, la categoría, el precio y el stock en caso de que no se proporcionen.

Rutas
GET /api/products: Obtiene todos los productos o filtra por categoría.
GET /api/products/:pid: Obtiene un producto específico por su ID.
POST /api/products: Crea un nuevo producto.
PUT /api/products/:pid: Actualiza un producto existente por su ID.
DELETE /api/products/:pid: Elimina un producto por su ID.
Middlewares
Error Handler: Middleware para manejar errores y devolver una respuesta JSON con el código de estado y el mensaje de error correspondiente.
Path Handler: Middleware para manejar las rutas no encontradas y devolver un mensaje JSON indicando que la ruta no existe.
Para el manejo de errores y rutas no encontradas, se utilizan los middlewares errorHandler y pathHandler respectivamente.

Estos métodos hacen uso de la clase `ProductsManager` que contiene los métodos `create`, `read` y `readOne` para la creación, lectura de todos los productos y lectura de un producto específico respectivamente. Cada método realiza operaciones específicas como crear un nuevo producto, filtrar productos por categoría o recuperar un producto por su ID.
