let productos = [
    new productos ("Cat Chow 6kg","alimentos para gatos adultos", 3100),
    new productos ("Comedor para gatos","tres divisiones",2500),
    new productos ("Cepillo de dientes","para gatos y perros",150),
    new productos("Juguete chico para gatos con pelotita","incluye pelotita de repuesto",2500),
    new productos ("Juguete grande para gatos con pelotitas","incluye 2 pelotitas y una de respuesto",4000),
    new productos ("Plumita para gato","color rojo",1200),
    new productos ("Jueguete para perro","color amarillo",800),
    new productos ("Correa alitas","color rosa", 1000),
    new productos ("Correa extensible","color rojo",1300),
]

let carritoDeCompra = []
    function producto (_nombre_descripcion_precio) {
        this.nombre = _nombre 
        this.descripcion = _descripcion 
        this.precio = _precio 
    }

    function listarProductos() {
        console.clear();
        console.log ("Los Productos Disponibles:");
        for (let index = 0; index < productos.length; index++) {
            console.log ("Producto: " + index + " - " + productos[index].nombre + "(" + productos[index].descripcion + ") $" + productos[index].precio)
        } 
    }

function listarCarrito() {
    console.clear();
    console.log ("Los Productos en el Carrito:");
    for (let index = 0; index < carritoDeCompra.length; index++) {
        console.log ("Producto: " + index + " - " + carritoDeCompra[index].nombre + "(" + carritoDeCompra[index].descripcion + ") $" + carritoDeCompra[index].precio)
    }
}

function agregarProducto (_nombre_descripcion_precio) {
    let productoNuevo = new producto (_nombre_descripcion_precio)
    producto.push (productoNuevo)
    console.log ("se ha agregado el producto" + _nombre)
}

function agregarAlCarrito (index) {
    carritoDeCompra.push (producto[index])
}

function eliminarDelCarrito (index) {
    carritoDeCompra.splice(index,1)
    console.log("Se ha eliminado el producto")
}

function precioTotal () {
    let sumaTotal = 0
    for (let index = 0; index < carritoDeCompra.length; index++) {
        sumaTotal += carritoDeCompra[index].precio 
        
    }
    return sumaTotal
}

function eliminarProducto (index) {
    productos.splice(index,1)
    console.log("Se ha eliminado el producto")
}