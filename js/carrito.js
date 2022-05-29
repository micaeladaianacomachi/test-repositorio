function ListarCarrito() {
    //Buscamos el carrito en el localStorage
    let carritoDeCompra = JSON.parse(localStorage.getItem('carritoDeCompras'));
    let contenedorDeProductos = document.getElementById("listadoProductosEnCarrito");

    let total = 0;

    contenedorDeProductos.innerHTML = '';
    if(carritoDeCompra.length){
        carritoDeCompra.forEach(producto => {
            total += (producto.precio * producto.cantidadEnCarrito);
            contenedorDeProductos.insertAdjacentHTML('beforeend', '<tr><td><img style="max-height: 180px;" src="img/' + producto.codigo + '.jpg"/></td><td>' + producto.nombre + '</td><td> <button class="btn btn-outline-info" onclick="EliminarDelCarrito(' + producto.codigo + ')"><i class="fa fa-minus-square"></i></button> $' + producto.precio + '(' + producto.cantidadEnCarrito + ') <button class="btn btn-outline-info" onclick="AgregarAlCarrito(' + producto.codigo + ')"><i class="fa fa-plus-square"></i></button></td><td> $' + (producto.precio * producto.cantidadEnCarrito) + ' </td></tr>')
        });
        contenedorDeProductos.insertAdjacentHTML('beforeend', '<tr><td align="right" colspan="3">Total<td><td>$' + total + '</td></tr>')
    } else {
        let contenedor = document.getElementById("productosEnCarrito");
        contenedor.innerHTML = '';
        contenedor.insertAdjacentHTML('beforeend', '<div class="text-center"><br><h2>Carrito Vacio</h2><br><p>Parece que tienes el carrito de compras vacio, por que no vas a ver los productos y decides si quieres comprar algo :)</p><br><a href="productos.html" class="btn btn-outline-info">Ir a Productos</a></div>')

    }
}

function EliminarDelCarrito (codigo) {
    //Buscamos el carrito en el localStorage
    let carritoEnLocalStorage = JSON.parse(localStorage.getItem('carritoDeCompras'));

    //Buscamos los productos en el localStorage
    let productos = JSON.parse(localStorage.getItem('productosEnTienda'));

    //Si no existe el carrito en el localStorage definimos el array vacio
    if(carritoEnLocalStorage != null) {
        carritoDeCompra = carritoEnLocalStorage;
    };

    //Encuentra el producto con el codigo recibido
    const producto = productos.find((element) => { 
        return element.codigo == codigo 
    })

    //Encuentra el producto con el codigo recibido
    const productoEnCarrito = carritoDeCompra.find((element) => { 
        return element.codigo == codigo 
    })

    //Si el producto se encuentra en el carrito, se le resta 1 a la cantidad que se esta comprando
    if(productoEnCarrito !== undefined) {
        if(productoEnCarrito.cantidadEnCarrito > 1){
            productoEnCarrito.cantidadEnCarrito = productoEnCarrito.cantidadEnCarrito - 1
        } else {
            carritoDeCompra = carritoDeCompra.filter((item) => item.codigo != codigo);
        }
        //Modifica el stock del producto encontrado
        producto.stock = producto.stock + 1
    }

    //Guardamos el array en el localStorage
    localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompra));

    //Guardamos el array en el localStorage
    localStorage.setItem('productosEnTienda', JSON.stringify(productos));

    //Recarga el listado de productos
    ListarCarrito();
}

function AgregarAlCarrito (codigo) {
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
    if(productoEnCarrito !== undefined)
        productoEnCarrito.cantidadEnCarrito = productoEnCarrito.cantidadEnCarrito + 1
    //Si el producto no esta en el carrito se lo agrega
    else
        carritoDeCompra.push(producto)

    //Modifica el stock del producto encontrado
    producto.stock = producto.stock - 1

    //Guardamos el array en el localStorage
    localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompra));

    //Guardamos el array en el localStorage
    localStorage.setItem('productosEnTienda', JSON.stringify(productosEnTienda));

    //Recarga el listado de productos
    ListarCarrito();
}

document.addEventListener('DOMContentLoaded', function () {
    ListarCarrito();
}, false);