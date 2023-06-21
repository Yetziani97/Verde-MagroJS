let productos = []

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".btn-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let btnAgregar = document.querySelectorAll(".producto-agregar");
const numeroCarrito = document.querySelector("#numero");

botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))

/* Tarjetas de productos*/

function cargarProductos(productosSeleccionados) {

    contenedorProductos.innerHTML = "";

    productosSeleccionados.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-tarjeta">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar al carrito</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBtnAgregar();

}

/* Cambiar categorias en el menu */

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "menu-completo") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            
            const productosClic = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosClic);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBtnAgregar() {
    btnAgregar = document.querySelectorAll(".producto-agregar");

    btnAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

/* funcion agregar al carrito y actualizar numerito */

let productosCarrito;

let productosCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosCarritoLS) {
    productosCarrito = JSON.parse(productosCarritoLS);
    (actualizarNumeroCarrito);
} else {
    productosCarrito = [];
}

function agregarAlCarrito(e) {

    
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right,  #ef8700, #f6b45ff1)",
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

    const idBtn = e.currentTarget.id;
    const productoAñadido = productos.find(producto => producto.id === idBtn);

    if(productosCarrito.some(producto => producto.id === idBtn)) {
        const index = productosCarrito.findIndex(producto => producto.id === idBtn);
        productosCarrito[index].cantidad++;
    } else {
        productoAñadido.cantidad = 1;
        productosCarrito.push(productoAñadido);
    }

    actualizarNumeroCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
}

function actualizarNumeroCarrito() {
    let nuevoNumeroCarrito = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumeroCarrito;
}

actualizarNumeroCarrito();
