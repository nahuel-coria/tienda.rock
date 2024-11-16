        // Selecciona el nav
        const nav = document.querySelector('.contenedorPadreNav');
    
        // Agrega un evento de scroll
        window.addEventListener('scroll', () => {
            // Si el scroll vertical es mayor a 50px, agrega la clase
            if (window.scrollY > 50) {
                nav.classList.add('navFijo');
            } else {
                // Quita la clase si se vuelve a la parte superior
                nav.classList.remove('navFijo');
            }
        });