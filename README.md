# desafio7-mongo-avanzado-oliver-zapata

## Pasos para ejecutarlo

- Seleccionar el archivo app.js y abrir en terminal integrada (Es decir abrir la consola)
- Instalar las dependencias ingresando en la consola: npm i express express-handlebars mongoose socket.io
- Colocar el comando: node app.js estándo en la caperta src, si no se está en el carpeta src entonces colocar: node src/app.js
- Abrir en el navegador las rutas http://localhost:8080/products y http://localhost:8080/carts/646b7bbcb035a38e23da5ad8

## Guía de rutas

### http://localhost:8080/products
En esta ruta se verán todos los productos con paginación con la opción de poder pasar algún producto al carrito, también se pueden ejecutar métodos post
y put mediante alguna herramienta como postman y en el navegador se verán los cambios automáticamente mediante la implementación de sockets al método get
que muestra la vista de esta ruta

### http://localhost:8080/carts/646b7bbcb035a38e23da5ad8
En esta ruta se pueden ver los productos del carrito en tiempo real al establecerse el id del carrito al final de la ruta, en este caso muestro los productos
dentro del carrito con el id: 646b7bbcb035a38e23da5ad8



## Guía de métodos
En el archivo principal app.js usa 3 routers:

app.use("/", viewsProductRouter);            (views.products.js)
app.use("/api/products", productsRouter);    (products.router.js)
app.use("/api/carts", cartsRouter);          (carts.router.js)

### Métodos del router products.router.js
### (Los métodos este router solo se pueden ejecutar mediante postman)

- Método GET<br>
http://localhost:8080/api/products
Ahora con la implementación de la paginación se puede colocar al final de la ruta un límite y una pagina específica que se quiera ver, como por ejemplo de esta forma: http://localhost:8080/api/products?page=2&limit=3, también se puede especificar un orden añadiendo sort (De forma descendente: http://localhost:8080/api/products?sort=desc) (De forma ascendente: http://localhost:8080/api/products?sort=asc)

- Método GET por id<br>
http://localhost:8080/api/products/:pid <br>
Una vez creado un producto se coloca su id como valor en el parámetro :pid

- Método POST<br>
http://localhost:8080/api/products <br>

- Método PUT<br>
http://localhost:8080/api/products/:pid <br>
Se actualizará el producto con el id específicado

- Método DELETE<br>
http://localhost:8080/api/products/:pid <br>
Se borrará el producto con el id específicado


### Métodos del router carts.router.js
### (Los métodos este router solo se pueden ejecutar mediante postman)
- Método GETAll<br>
http://localhost:8080/api/carts/getAll
Mediante este método el usuario puede darse cuenta de todos los carritos que se han creado

- Método GET por ID<br>
http://localhost:8080/api/carts/:pid<br>
Una vez creado un carrito se coloca su id como valor en el parámetro :pid

- Método POST<br>
http://localhost:8080/api/carts

- Método POST (para pasar un producto al carrito)<br>
http://localhost:8080/api/carts/:cid/product/:pid<br>
Aquí se usa el id del carrito en el parámetro :cid para especificar en que carrito quiero poner el producto, y se usa el id del producto en el parámetro :pid para especificar que producto a poner en el carrito

- Método PUT (para añadir paginación)
http://localhost:8080/api/carts/:cid
En este método se puede agregar también un sort, limit o page para hacer especificaciones en la página

- Método PUT (para actualizar un producto en el array de productos)
http://localhost:8080/api/carts/:cid/product/:pid
En este método se puede alterar la cantidad de un producto especifico de un carrito especifico según su id pasándole un objeto se esta manera por ejemplo: 
{              
  "quantity": 8
}

- Método DELETE (para quitar un producto del carrito)<br>
http://localhost:8080/api/carts/:cid/product/:pid<br>
Al igual que el método anterior se usa el id del carrito en el parámetro :cid para especificar de que carrito eliminar el producto, y se usa el id del producto en el parámetro :pid para especificar que producto eliminar del carrito.<br>
Cuando se elimina un producto con cierta cantidad (por ejemplo 8) esta va disminuyendo, pero si la cantidad es 1 y se ejecuta este método lo borrará al no quedar ninguna cantidad de ese producto

- Método DELETE (para eliminar carrito)<br>
http://localhost:8080/api/carts/deleteCart/:cid<br>
Se borrará el carrito con el id específicado

