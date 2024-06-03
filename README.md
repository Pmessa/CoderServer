
# Implementaciónde Costom router
Algunas características y funcionalidades clave de este código son:

# Inicialización del enrutador: 
En el constructor de la clase, se inicializa un enrutador de Express que se puede obtener y utilizar para definir rutas.

# Manejo de respuestas: 
Se define un conjunto de funciones para facilitar la creación de respuestas HTTP comunes, como respuestas exitosas con diferentes códigos de estado (200, 201) y respuestas de error (400, 401, 403, 404).

# Policies (Políticas de autorización): 
Se implementa una función de middleware policies que verifica si se cumplen las políticas de autorización especificadas antes de permitir el acceso a una ruta. Estas políticas pueden ser de tipo "PUBLIC", "USER" o "ADMIN", dependiendo del rol del usuario.

# Funciones para crear, leer, actualizar y eliminar recursos: 
Se proporcionan métodos create, read, update, y destroy que permiten definir fácilmente rutas para la creación, lectura, actualización y eliminación de recursos, respectivamente. Estas rutas pueden estar protegidas por políticas de autorización.

# Middleware personalizados: 
A través de la función applyCbs, se pueden aplicar callbacks (funciones middleware) de forma dinámica a cada ruta, lo que facilita la modularización y reutilización del código.

Al integrar esta clase CustomRouter en una aplicación Express, se pueden definir y proteger rutas de manera estructurada y segura, asegurando que solo los usuarios autorizados tengan acceso a ciertas funcionalidades.

# Sistema de Sesiones Mejorado

Se ha implementado un nuevo sistema de sesiones que permite a los usuarios registrarse, iniciar sesión, verificar su estado en línea y cerrar sesión de manera segura. Esta mejora proporciona una mayor seguridad y una mejor experiencia de usuario en la aplicación.

En el front se realizaron las funciones necesarias para renderizar el carrito solo si el usuario está  logueado y solo puede agregar al carrito un usuario son su sesión activa.

## Descripción
Esta es una aplicación web simple que permite a los usuarios navegar, agregar productos a su carrito y realizar compras. La aplicación incluye funciones como registro de usuario, inicio de sesión y gestión de carrito. Está construida utilizando Node.js y MongoDB para el almacenamiento de datos.

## Instalación
1. Clonar este repositorio
2. Ejecutar `npm install` para instalar las dependencias
3. Configurar una base de datos MongoDB y actualizar los detalles de conexión en el archivo `.env`
4. Ejecutar `npm run dev` para iniciar el servidor

## Características
- Operaciones CRUD para productos, usuarios y carritos
- Paginación para ver todos los recursos
- Manejo de errores con errorHandler y pathHandler
- Registro de solicitudes con morgan
- API REST 100% en inglés
- Conexión a MongoDB
- Autenticación básica de usuario con roles
- Página de inicio con listado de productos y filtrado por categoría
- Página de detalle del producto con funcionalidad de agregar al carrito
- Formularios de registro e inicio de sesión de usuario
- Página de carrito para ver y gestionar elementos en el carrito

## Estructura de Datos
### Producto
- id (identificador hexadecimal de 12 bytes)
- título (obligatorio)
- foto (valor por defecto)
- categoría (valor por defecto)
- precio (por defecto 1)
- stock (por defecto 1)

### Usuario
- id (identificador hexadecimal de 12 bytes)
- foto (valor por defecto)
- email (obligatorio)
- contraseña (obligatorio)
- rol (por defecto 0)

### Carrito
- user_id (referencia al usuario que agregó el producto)
- product_id (referencia al producto agregado al carrito)
- cantidad (numérico, obligatorio)
- estado (estado de la compra: "reservado", "pagado", "entregado")

## Endpoints de la API
- `/api/productos`: Operaciones CRUD para productos
- `/api/usuarios`: Operaciones CRUD para usuarios
- `/api/carritos`: Operaciones CRUD para carritos
- `/api/sessions/register`: Similar al create de un usuario, implementa la estrategia de passport correspondiente y hashea la contraseña
- `/api/sessions/login`: Para iniciar sesión, implementa la estrategia de passport correspondiente y compara la contraseña
- `/api/sessions`: Para ver los datos del usuario online (y renderizar el perfil de usuario o condicionar la barra de navegación), implementa la estrategia de passport correspondiente
- Login/register con Google

## Vistas
- `localhost:8080/`: Página de inicio con listado de productos y filtrado
- `localhost:8080/products/:pid`: Página de detalle del producto con botón de agregar al carrito
- `localhost:8080/users/register`: Formulario de registro de usuario (funcional)
- `localhost:8080/users/login`: Formulario de inicio de sesión de usuario (funcional)
- `localhost:8080/users`: Página de perfil de usuario, funciona sin el parámetro (usa los datos de la sesión para enviar el id del usuario)
- `localhost:8080/carts`: Página de carrito, funciona sin el parámetro (usa los datos de la sesión para enviar el id del usuario)

## Funcionalidades Adicionales
- Barra de navegación con la correspondiente protección de rutas (si el usuario está o no con sesión iniciada)
- Alertas de éxito/fracaso de registro, inicio y cierre de sesión funcionales

## Autores
- Sebastián Ávila 
- Pablo Messa



