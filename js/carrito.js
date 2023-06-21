let productosCarrito = localStorage.getItem("productos-en-carrito");
productosCarrito = JSON.parse(productosCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoFunciones = document.querySelector("#carrito-funcion");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const btnVaciar = document.querySelector("#carrito-funcion-vaciar");
const contenedorTotal = document.querySelector("#total");
const btnComprar = document.querySelector("#carrito-funcion-comprar");

/*menu de checkout*/

function cargarProductosCarrito() {
    if (productosCarrito && productosCarrito.length > 0) {

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoFunciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";
    
        productosCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })

        actualizarBotonesEliminar();
        actualizarTotal();

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoFunciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}

cargarProductosCarrito();


/*boton eliminar*/

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

/*funcion eliminar articulo del carrito*/

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ef8700, #f6b45ff1)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBtn  = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id === idBtn);
    
    productosCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));

}

/*funcion vaciar carrito*/

btnVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        html: `Se van a borrar ${productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos. `,
        position: 'center',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
            cargarProductosCarrito();
        }
      })
}


/*funcion actualizar total */
function actualizarTotal() {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}


/*funcion comprar*/

btnComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    Swal.fire({
        title: 'Chef ¡Tenemos un nuevo pedido!',
        imageUrl: './assets/extra/repartidor.png',
        imageWidth: 250,
        imageHeight: 250,
        imageAlt: 'Custom image',
        position: 'center',
        showConfirmButton: false,
        timer: 2200,
        
      })

    productosCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoFunciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}


