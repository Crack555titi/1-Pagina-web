document.addEventListener("DOMContentLoaded", () => {
    // Consultamos al backend si hay sesión activa
    fetch('php/check_session.php')
        .then(respuesta => respuesta.json())
        .then(data => {
            const btnLogin = document.getElementById('btnLogin');
            const userProfile = document.getElementById('userProfile');
            const userName = document.getElementById('userName');

            if (data.logueado === true) {
                // Usuario logueado: Ocultamos botón y mostramos avatar
                if (btnLogin) btnLogin.style.display = 'none';
                if (userProfile) userProfile.style.display = 'flex';
                if (userName) userName.textContent = data.nombre;
            } else {
                // Usuario no logueado: Mostramos botón y ocultamos avatar
                if (btnLogin) btnLogin.style.display = 'inline-block';
                if (userProfile) userProfile.style.display = 'none';
            }
        })
        .catch(error => {
            console.error("Error comprobando la sesión:", error);
        });
});