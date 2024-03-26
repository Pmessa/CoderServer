TERCERA ENTREGA BACKEND CODERHOUSE

En el código, se utilizan varios métodos en un servidor para gestionar productos. 

1. **server.get("/api/products/:title/:category/:price")**: Este método se encarga de crear un nuevo producto con la información proporcionada a través de los parámetros de la URL.

2. **server.get("/api/products")**: Este método se encarga de recuperar todos los productos o filtrarlos por categoría, según el parámetro de consulta `category`. 

3. **server.get("/api/products/:pid")**: Este método se encarga de recuperar un producto específico según su ID proporcionado en los parámetros de la URL. En caso de no encontrar el producto, se devuelve un mensaje de error.

Estos métodos hacen uso de la clase `ProductsManager` que contiene los métodos `create`, `read` y `readOne` para la creación, lectura de todos los productos y lectura de un producto específico respectivamente. Cada método realiza operaciones específicas como crear un nuevo producto, filtrar productos por categoría o recuperar un producto por su ID.
