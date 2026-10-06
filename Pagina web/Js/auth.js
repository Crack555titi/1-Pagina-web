document.addEventListener("DOMContentLoaded", () => {
    // Verificar el estado de sesión
    fetch('../PHP/comproba_session.php')
        .then(response => response.json())
        .then(data => {
            const authButton = document.getElementById("authButton");

            if (data.logueado) {
                // Si el usuario está logueado, convertir el botón en el perfil
                authButton.innerHTML = `
                    <img src="../imagenes/${data.imagen}" alt="Perfil" class="profile-img">
                    <span>${data.nombre}</span>
                `;
                authButton.href = "#"; // Evitar redirección
                authButton.classList.add("profile-btn");

                // Agregar un menú desplegable o acción para cerrar sesión
                authButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    mostrarMenuPerfil(data.nombre, data.imagen);
                });
            }
        })
        .catch(error => console.error("Error al verificar la sesión:", error));
});

// Función para mostrar un menú de perfil (opcional)
function mostrarMenuPerfil(nombre, imagen) {
    const menu = document.createElement("div");
    menu.classList.add("profile-menu");
    menu.innerHTML = `
        <p>Hola, ${nombre}</p>
        <button id="logoutButton" class="btn">Cerrar sesión</button>
    `;
    document.body.appendChild(menu);

    // Manejar el cierre de sesión
    document.getElementById("logoutButton").addEventListener("click", cerrarSesion);
}

// Función para cerrar sesión
function cerrarSesion() {
    fetch('../PHP/logout.php')
        .then(() => {
            window.location.reload(); // Recargar la página
        })
        .catch(error => console.error("Error al cerrar sesión:", error));
}