// let productos = [
//     new productos ("Cat Chow 6kg","alimentos para gatos adultos", 3100),
//     new productos ("Comedor para gatos","tres divisiones",2500),
//     new productos ("Cepillo de dientes","para gatos y perros",150),
//     new productos("Juguete chico para gatos con pelotita","incluye pelotita de repuesto",2500),
//     new productos ("Juguete grande para gatos con pelotitas","incluye 2 pelotitas y una de respuesto",4000),
//     new productos ("Plumita para gato","color rojo",1200),
//     new productos ("Jueguete para perro","color amarillo",800),
//     new productos ("Correa alitas","color rosa", 1000),
//     new productos ("Correa extensible","color rojo",1300),
// ]

// let carritoDeCompra = []
//     function Producto (_nombre_descripcion_precio) {
//         this.nombre = _nombre 
//         this.descripcion = _descripcion 
//         this.precio = _precio 
//     }

//     function ListarProductos() {
//         console.clear();
//         console.log ("Los Productos Disponibles:");
//         for (let index = 0; index < productos.length; index++) {
//             console.log ("Producto: " + index + " - " + productos[index].nombre + "(" + productos[index].descripcion + ") $" + productos[index].precio)
//         } 
//     }

// function ListarCarrito() {
//     console.clear();
//     console.log ("Los Productos en el Carrito:");
//     for (let index = 0; index < carritoDeCompra.length; index++) {
//         console.log ("Producto: " + index + " - " + carritoDeCompra[index].nombre + "(" + carritoDeCompra[index].descripcion + ") $" + carritoDeCompra[index].precio)
//     }
// }

// function AgregarProducto (_nombre_descripcion_precio) {
//     let productoNuevo = new producto (_nombre_descripcion_precio)
//     producto.push (productoNuevo)
//     console.log ("se ha agregado el producto" + _nombre)
// }

// function AgregarAlCarrito (index) {
//     carritoDeCompra.push (producto[index])
// }

// function EliminarDelCarrito (index) {
//     carritoDeCompra.splice(index,1)
//     console.log("Se ha eliminado el producto")
// }

// function PrecioTotal () {
//     let sumaTotal = 0
//     for (let index = 0; index < carritoDeCompra.length; index++) {
//         sumaTotal += carritoDeCompra[index].precio 
        
//     }
//     return sumaTotal
// }

// function EliminarProducto (index) {
//     productos.splice(index,1)
//     console.log("Se ha eliminado el producto")
// }

// const btn = document.getElementById ('btnMain')
// btn.addEventListener ('click', respuestaClick)
// function respuestaClick () {
//     alert('Te postlaste con exito para ser hogar provisorio')
// }


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

let productos = [
    new Producto ("1" ,"Cat Chow 6kg","alimentos para gatos adultos", 3100, 10, 1),
    new Producto ("10" ,"Comedor para gatos","tres divisiones",2500, 10, 1),
    new Producto ("3" ,"Cepillo de dientes","para gatos y perros",150, 10, 1),
    new Producto ("4" ,"Juguete chico para gatos con pelotita","incluye pelotita de repuesto",2500, 10, 1),
    new Producto ("5" ,"Juguete grande para gatos con pelotitas","incluye 2 pelotitas y una de respuesto",4000, 10, 1),
    new Producto ("6" ,"Plumita para gato","color rojo",1200, 10, 1),
    new Producto ("7" ,"Huesito","color amarillo",800, 10, 1),
    new Producto ("8" ,"Correa alitas","color rosa", 1000, 10, 1),
    new Producto ("9" ,"Correa extensible","color rojo",1300, 10, 1),
    new Producto ("11" ,"Correa extensible","color blanca",1700, 2, 1)
]

let carritoDeCompra = []

function ListarProductos() {
    console.clear();
    console.log ("Los Productos Disponibles:");
    for (let index = 0; index < productos.length; index++) {
        console.log ("Producto: " + index + " - " + productos[index].nombre + "(" + productos[index].descripcion + ") $" + productos[index].precio)
    } 
}

function ListarProductosHtml(){
    console.clear();
    console.log ("Los Productos Disponibles:");
    let contenedorDeProductos = document.getElementById("productosEnVenta");
    contenedorDeProductos.innerHTML = '';
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

function ListarCarrito() {
    console.clear();
    console.log ("Los Productos en el Carrito:");
    carritoDeCompra.forEach(producto => {
        console.log ("Producto: " + producto.codigo + " - " 
                                  + producto.nombre 
                                  + "(" + producto.descripcion + ") $" 
                                  + (producto.precio * producto.cantidadEnCarrito) + " " +
                                  + "($" + producto.precio + "x" + producto.cantidadEnCarrito + ")")
    });
    console.log ("Total: $" + PrecioTotal());
}

function AgregarAlCarrito (codigo) {
    //Encuentra el producto con el codigo recibido
    const producto = productos.find((element) => { 
        return element.codigo == codigo 
    })

    //Encuentra el producto con el codigo recibido
    const productoEnCarrito = carritoDeCompra.find((element) => { 
        return element.codigo == codigo 
    })

    //Si el producto se encuentra en el carrito, se le suma 1 a la cantidad que se esta comprando
    if(productoEnCarrito !== undefined)
        productoEnCarrito.cantidadEnCarrito = producto.cantidadEnCarrito + 1
    //Si el producto no esta en el carrito se lo agrega
    else
        carritoDeCompra.push(producto)

    //Modifica el stock del producto encontrado
    producto.stock = producto.stock - 1

    //Recarga el listado de productos
    ListarProductosHtml();
}

function EliminarDelCarrito (index) {

    const resultado = productos.find((element) => { 
        return element.codigo == carritoDeCompra[index].codigo 
    })

    carritoDeCompra.splice(index,1)
    console.log("Se ha eliminado el producto")
    resultado.stock = resultado.stock + 1

    listarProductosHtml();
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
    ListarProductosHtml()
}, false);


