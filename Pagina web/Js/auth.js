document.addEventListener("DOMContentLoaded", () => {
    const nombreUsuario = localStorage.getItem("usuario_nombre");
    const esPaginaLoginORegistro = window.location.pathname.includes("LogIn.html") || 
                                   window.location.pathname.includes("Registrarse.html");

    // SI EL USUARIO ESTÁ LOGUEADO
    if (nombreUsuario) {

        // 1. Si intenta entrar a LogIn o Registrarse estando logueado, lo manda al index
        if (esPaginaLoginORegistro) {
            window.location.href = "../index.html";
            return;
        }

        // 2. En cualquier otra página, oculta el botón de login y muestra el usuario
       const boton = document.querySelector('.Iniciar_sesion');
        boton.remove();


        if (btnLogin) btnLogin.style.display = "none";
        if (userProfile) userProfile.style.display = "flex";
        if (userName) userName.textContent = nombreUsuario;
    }
});

// Función global para cerrar sesión cuando quieras
function cerrarSesion() {
    localStorage.removeItem("usuario_nombre");
    window.location.reload();
}