class Producto {
    constructor(_codigo, _nombre, _descripcion, _precio, _stock, _cantidadEnCarrito) {
        this.codigo = _codigo;
        this.nombre = _nombre;
        this.descripcion = _descripcion;
        this.precio = _precio;
        this.stock = _stock;
        this.cantidadEnCarrito = _cantidadEnCarrito;
    }
}

let productos = []

let carritoDeCompra = []

const obtenerProductos = async () => {
    const respuesta = await fetch("./data/productos.json")
    const data = await respuesta.json();
    
    data.forEach(producto => {
        productos.push(new Producto(producto.codigo, producto.nombre, producto.descripcion, producto.precio, producto.stock, producto.cantidadEnCarrito))
    })
    
    ListarProductosHtml();
}

function ListarProductosHtml(){
    console.clear();
    console.log ("Los Productos Disponibles:");
    let contenedorDeProductos = document.getElementById("productosEnVenta");
    contenedorDeProductos.innerHTML = '';

    //Buscamos el carrito en el localStorage
    let productosEnLocalStorage = JSON.parse(localStorage.getItem('productosEnTienda'));

    console.log(productosEnLocalStorage);

    //
    if(productosEnLocalStorage != null) {
        productos = productosEnLocalStorage;
    } else{
        localStorage.setItem('productosEnTienda', JSON.stringify(productos));
    };

    productos.forEach(producto => {
        contenedorDeProductos.insertAdjacentHTML('beforeend', '<div class="col"><div class="card" style="width: 18rem;"><img src="/img/' + producto.codigo + '.jpg" class="card-img-top" alt="' + producto.descripcion + '"><div class="card-body text-center"> <h5 class="card-title">' + producto.nombre + '(' + producto.stock + ')</h5><p class="card-text">$' + producto.precio + '</p><button class="btn btn-success" onclick="AgregarAlCarrito(' + producto.codigo + ')">Comprar</button></div></div></div>')
    });
}

function AgregarProducto (_nombre,_descripcion,_color,_talle,_precio) {
    let productoNuevo = new Producto(_nombre,_descripcion,_color,_talle,_precio)
    productos.push(productoNuevo)
    console.log ("Se ha agregado el producto" + _nombre)
}

function EliminarProducto (index) {
    productos.splice(index,1)
    console.log("Se ha eliminado el producto")
}

function AgregarAlCarrito (codigo) {
    let mensaje = "";

    //Buscamos el carrito en el localStorage
    let carritoEnLocalStorage = JSON.parse(localStorage.getItem('carritoDeCompras'));

    //Buscamos los productos en el localStorage
    let productosEnTienda = JSON.parse(localStorage.getItem('productosEnTienda'));

    //Si no existe el carrito en el localStorage definimos el array vacio
    if(carritoEnLocalStorage != null) {
        carritoDeCompra = carritoEnLocalStorage;
    };

    //Encuentra el producto con el codigo recibido
    const producto = productosEnTienda.find((element) => { 
        return element.codigo == codigo 
    })

    //Encuentra el producto con el codigo recibido
    const productoEnCarrito = carritoDeCompra.find((element) => { 
        return element.codigo == codigo 
    })

    //Si el producto se encuentra en el carrito, se le suma 1 a la cantidad que se esta comprando
    if(productoEnCarrito !== undefined){
        productoEnCarrito.cantidadEnCarrito = productoEnCarrito.cantidadEnCarrito + 1
        mensaje += "Ahora tienes: " + productoEnCarrito.cantidadEnCarrito + " de: " + productoEnCarrito.nombre + ", en el carrito";
    }
    //Si el producto no esta en el carrito se lo agrega
    else {
        carritoDeCompra.push(producto)
        mensaje += "Se agrego 1 " + producto.nombre + " al Carrito.";
    }

    //Modifica el stock del producto encontrado
    producto.stock = producto.stock - 1

    //Guardamos el array en el localStorage
    localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompra));

    //Guardamos el array en el localStorage
    localStorage.setItem('productosEnTienda', JSON.stringify(productosEnTienda));

    //Recarga el listado de productos
    ListarProductosHtml();

    swal({
        title: "Agregar Producto al Carrito",
        text: mensaje,
        icon: "success",
        buttons: {
            continuar: "Continuar Comprando!",
            carrito: "Ir al Carrito"
        }
    })
    .then((value) => {
        switch (value) {
            case "continuar":
                break;
            case "carrito":
                location.href = 'carrito.html';
                break;
        }
    });
}

function PrecioTotal () {
    let sumaTotal = 0
    for (let index = 0; index < carritoDeCompra.length; index++) {
        sumaTotal += carritoDeCompra[index].precio * carritoDeCompra[index].cantidadEnCarrito
    }
    return sumaTotal
}

function Iniciar() {
    let nombre = prompt ("Bienvenidos, por favor ingrese su nombre ☻")
    do {
        respuesta = prompt ("Hola "+  nombre + ", Si quiere ver los productos en stock escriba 'productos', para ver su carrito escriba 'carrito' o para salir escriba 'salir'  ") 
        switch (respuesta) {
            case "productos":
                do {
                    listarProductos()
                    respuesta = prompt ("si quiere agregar un producto al carrito ingrese el numero del producto o si quiere volver al menu escriba 'volver' ")
                    if (Number.isInteger(parseInt(respuesta))) {
                        if (productos [parseInt(respuesta)] != -1){
                            agregarAlCarrito(parseInt(respuesta))
                            console.log ("Producto Agregado al Carrito Correctamente")
                            console.log ("------------------------------------------")
                        } else {
                            alert ("el numero ingresado no esta disponible")
                            console.log ("-----------------------------------------")
                        }
                    }
                } while (respuesta != "volver" || respuesta === null); 
                respuesta = ""   
                console.clear();
                break;
            case "carrito":
                do {
                    listarCarrito()
                    console.log ("suma total del carrito = $" + precioTotal());
                    respuesta = prompt ("si quiere quitar un producto del carrito ingrese el numero del producto o si quiere volver al menu escriba 'volver' ")
                    
                    if (Number.isInteger( parseInt(respuesta))) {
                        if (carritoDeCompra[parseInt(respuesta)] != -1){
                            eliminarDelCarrito(parseInt(respuesta))
                            console.log ("Producto eliminado del Carrito Correctamente")
                            console.log ("------------------------------------------")
                        } else {
                            alert ("el numero ingresado no esta disponible")
                            console.log ("-----------------------------------------")
                        }
                    }
                } while (respuesta != "volver" || respuesta === null);
                respuesta = ""
                console.clear();
                break;
        }
    } while (respuesta != "salir" || respuesta === null);
}

document.addEventListener('DOMContentLoaded', function () {
    obtenerProductos();
}, false);
