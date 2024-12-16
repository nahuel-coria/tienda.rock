document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".btnAgregarCarrito");
    const contadorCarrito = document.getElementById("cuenta-carrito");

    // Inicializar el contador y los productos en el localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    actualizarContador();

    // Agregar eventos a los botones
    botonesAgregar.forEach((boton, index) => {
        boton.addEventListener("click", (event) => {
            event.preventDefault();

            // Obtener información del producto
            const producto = boton.closest("div");
            const nombre = producto.querySelector("h3").textContent;
            const precio = producto.querySelector("h4").textContent;
            const imagen = producto.querySelector("img").src;

            // Crear objeto del producto
            const productoObj = { nombre, precio, imagen };

            // Agregar al carrito y al localStorage
            carrito.push(productoObj);
            localStorage.setItem("carrito", JSON.stringify(carrito));

            // Actualizar contador del carrito
            actualizarContador();
        });
    });

    function actualizarContador() {
        contadorCarrito.textContent = carrito.length;
    }
});


/* Lógica de carrito de página Carrito */

document.addEventListener("DOMContentLoaded", () => {
    const listaCarrito = document.getElementById("lista-carrito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        carrito.forEach((producto) => {
            const item = document.createElement("div");
            item.classList.add("producto-carrito");
            item.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
                <h3>${producto.nombre}</h3>
                <p>${producto.precio}</p>
            `;
            listaCarrito.appendChild(item);
        });
    }
});
