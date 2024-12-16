// Selecciona el nav
const nav = document.querySelector('.contenedorPadreNav');

// Agrega un evento de scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('navFijo');
    } else {
        nav.classList.remove('navFijo');
    }
});

/*  Carrito */

document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".btnAgregarCarrito");
    const contadorCarrito = document.getElementById("cuenta-carrito");

    // Inicializar el carrito desde el localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    actualizarContador();

    // Agregar eventos a los botones de agregar al carrito
    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", (event) => {
            event.preventDefault();

            // Obtener información del producto
            const producto = boton.closest("div");
            const nombre = producto.querySelector("h3").textContent;
            const precio = producto.querySelector("h4").textContent;
            const imagen = producto.querySelector("img").src;

            // Verificar si el producto ya está en el carrito
            const index = carrito.findIndex((item) => item.nombre === nombre);
            if (index !== -1) {
                carrito[index].cantidad += 1; // Incrementar cantidad
            } else {
                carrito.push({ nombre, precio, imagen, cantidad: 1 }); // Agregar nuevo producto
            }

            // Guardar en localStorage y actualizar contador
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarContador();
        });
    });

    // Función para actualizar el contador del carrito
    function actualizarContador() {
        const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        contadorCarrito.textContent = totalProductos;
    }

    // Escucha cambios globales del carrito y actualiza el contador
    document.addEventListener("carritoActualizado", actualizarContador);
});

/* Lógica de carrito de página Carrito */

document.addEventListener("DOMContentLoaded", () => {
    const listaCarrito = document.getElementById("lista-carrito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para renderizar el carrito
    function renderizarCarrito() {
        listaCarrito.innerHTML = ""; // Limpia la tabla

        if (carrito.length === 0) {
            listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
        } else {
            const table = document.createElement("table");
            table.classList.add("carrito-tabla");

            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;

            const tbody = table.querySelector("tbody");

            carrito.forEach((producto, index) => {
                const total = parseInt(producto.precio.replace("$", "").replace(".", "")) * producto.cantidad;

                const fila = document.createElement("tr");
                fila.classList.add("carrito-fila");
                fila.innerHTML = `
                    <td>
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-img">
                        ${producto.nombre}
                    </td>
                    <td>${producto.precio}</td>
                    <td>
                        <button class="carrito-btn-restar" data-index="${index}">-</button>
                        <span class="carrito-cantidad">${producto.cantidad}</span>
                        <button class="carrito-btn-sumar" data-index="${index}">+</button>
                    </td>
                    <td>$${total.toLocaleString()}</td>
                    <td>
                        <button class="carrito-btn-eliminar" data-index="${index}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(fila);
            });

            listaCarrito.appendChild(table);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarContador();
    }

    // Evento para sumar cantidad
    listaCarrito.addEventListener("click", (e) => {
        if (e.target.classList.contains("carrito-btn-sumar")) {
            const index = e.target.dataset.index;
            carrito[index].cantidad += 1;
            renderizarCarrito();
            location.reload();

        }
    });

    // Evento para restar cantidad
    listaCarrito.addEventListener("click", (e) => {
        if (e.target.classList.contains("carrito-btn-restar")) {
            const index = e.target.dataset.index;
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad -= 1;
            } else {
                carrito.splice(index, 1); // Eliminar si la cantidad llega a 0
            }
            renderizarCarrito();
            location.reload();

            

        }
    });

    // Evento para eliminar un producto
    listaCarrito.addEventListener("click", (e) => {
        if (e.target.classList.contains("carrito-btn-eliminar")) {
            const index = e.target.dataset.index;
            carrito.splice(index, 1);
            renderizarCarrito();
            location.reload();

        }
    });

    // Función para actualizar el contador del carrito
    function actualizarContador() {
        const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        const contadorCarrito = document.getElementById("cuenta-carrito");
        contadorCarrito.textContent = totalProductos;

        // Lanzar evento global
        document.dispatchEvent(new Event("carritoActualizado"));
    }

    // Inicializar el carrito
    renderizarCarrito();
});


/* Nav Mobile */

document.addEventListener("DOMContentLoaded", () => {
    const menuHamburguesa = document.querySelector(".menuHamburguesa");
    const menuPrincipal = document.querySelector(".menuPrincipal");

    menuHamburguesa.addEventListener("click", () => {
        menuPrincipal.classList.toggle("activo"); // Activa/desactiva el menú
    });

    // Opcional: Cerrar menú al hacer clic en un enlace
    menuPrincipal.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            menuPrincipal.classList.remove("activo");
        }
    });
});
