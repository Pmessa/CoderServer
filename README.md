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

