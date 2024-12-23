// Selecciona el nav
const nav = document.querySelector('.contenedorPadreNav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('navFijo');
    } else {
        nav.classList.remove('navFijo');
    }
});

/* Carrito */

document.addEventListener("DOMContentLoaded", () => {
    // Verifica si estamos en la página del carrito
    if (window.location.pathname.includes("carrito")) {
        const listaCarrito = document.getElementById("lista-carrito");
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const cuentaCarritoElement = document.getElementById("cuenta-carrito");

        function renderizarCarrito() {
            listaCarrito.innerHTML = ""; 

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

        if (listaCarrito) {
            listaCarrito.addEventListener("click", (e) => {
                if (e.target.classList.contains("carrito-btn-sumar")) {
                    const index = e.target.dataset.index;
                    carrito[index].cantidad += 1;
                    renderizarCarrito();
                }
            });

            listaCarrito.addEventListener("click", (e) => {
                if (e.target.classList.contains("carrito-btn-restar")) {
                    const index = e.target.dataset.index;
                    if (carrito[index].cantidad > 1) {
                        carrito[index].cantidad -= 1;
                    } else {
                        carrito.splice(index, 1); 
                    }
                    renderizarCarrito();
                }
            });

            listaCarrito.addEventListener("click", (e) => {
                if (e.target.classList.contains("carrito-btn-eliminar")) {
                    const index = e.target.dataset.index;
                    carrito.splice(index, 1);
                    renderizarCarrito();
                }
            });
        } else {
            console.log("No se encuentra el elemento lista-carrito.");
        }

        function actualizarContador() {
            let cuenta = 0;
            const memoria = JSON.parse(localStorage.getItem("carrito"));
            if (memoria && memoria.length > 0) {
                cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
            }
            cuentaCarritoElement.innerText = cuenta;
        }

        renderizarCarrito();
    }
});

/* Agregar al carrito en otras páginas */

document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".btnAgregarCarrito");
    const contadorCarrito = document.getElementById("cuenta-carrito");

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    actualizarContador();

    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", (event) => {
            event.preventDefault();

            const producto = boton.closest("div");
            const nombre = producto.querySelector("h3").textContent;
            const precio = producto.querySelector("h4").textContent;
            const imagen = producto.querySelector("img").src;

            const index = carrito.findIndex((item) => item.nombre === nombre);
            if (index !== -1) {
                carrito[index].cantidad += 1; 
            } else {
                carrito.push({ nombre, precio, imagen, cantidad: 1 }); 
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarContador();
        });
    });

    function actualizarContador() {
        const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        contadorCarrito.textContent = totalProductos;
    }

    document.addEventListener("carritoActualizado", actualizarContador);
});

/* Nav Mobile */

document.addEventListener("DOMContentLoaded", () => {
    const menuHamburguesa = document.querySelector(".menuHamburguesa");
    const menuPrincipal = document.querySelector(".menuPrincipal");

    menuHamburguesa.addEventListener("click", () => {
        menuPrincipal.classList.toggle("activo"); 
    });

    menuPrincipal.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            menuPrincipal.classList.remove("activo");
        }
    });
});
