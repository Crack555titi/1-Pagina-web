document.addEventListener("DOMContentLoaded", () => {
    fetch('php/check_session.php')
        .then(res => res.json())
        .then(data => {
            const btnLogin = document.getElementById('btnLogin');
            const btnPerfil = document.getElementById('btnPerfil');
            const userName = document.getElementById('userName');
            const menuUserName = document.getElementById('menuUserName');

            if (data.logueado) {
                if (btnLogin) btnLogin.style.display = 'none';
                if (btnPerfil) btnPerfil.style.display = 'flex';
                
                if (userName) userName.textContent = data.nombre;
                if (menuUserName) menuUserName.textContent = "Hola, " + data.nombre;
            } else {
                if (btnLogin) btnLogin.style.display = 'inline-block';
                if (btnPerfil) btnPerfil.style.display = 'none';
            }
        });
});

// Función para abrir y cerrar el panel izquierdo
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    menu.classList.toggle('active');
}