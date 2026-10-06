(function () {
    const isInsidePagesFolder = window.location.pathname.includes('/pages/');
    const basePath = isInsidePagesFolder ? '..' : '.';
    const sessionUrl = `${basePath}/PHP/comproba_session.php`;
    const profileUrl = `${basePath}/PHP/actualizar_perfil.php`;
    const logoutUrl = `${basePath}/PHP/logout.php`;
    const loginHref = isInsidePagesFolder ? 'LogIn.html' : 'pages/LogIn.html';
    const root = document.getElementById('userButtonRoot');

    function getInitials(nombre, apellido) {
        const first = (nombre || '').trim().charAt(0).toUpperCase();
        const second = (apellido || '').trim().charAt(0).toUpperCase();
        return (first || second || 'U') + (second || '');
    }

    function buildAvatarMarkup(user) {
        if (user && user.avatar) {
            return `
                <div class="user-avatar">
                    <img src="${user.avatar}" alt="Avatar de ${user.nombre || 'usuario'}">
                </div>
            `;
        }

        const initials = getInitials(user?.nombre, user?.apellido);
        return `<div class="user-avatar">${initials}</div>`;
    }

    function buildGuestMarkup() {
        return `
            <a class="user-button is-guest" href="${loginHref}">
                <span class="user-avatar">U</span>
                <span class="user-name">Iniciar sesión</span>
            </a>
        `;
    }

    function buildLoggedMarkup(user) {
        const fullName = [user?.nombre, user?.apellido].filter(Boolean).join(' ') || 'Usuario';
        const email = user?.email || 'usuario@aerusclub.com';

        return `
            <div class="user-button" type="button" aria-expanded="false">
                <div class="user-info">
                    ${buildAvatarMarkup(user)}
                    <span class="user-name">${fullName}</span>
                </div>
                <span class="user-caret">▾</span>
            </div>
            <div class="user-menu hidden" aria-live="polite">
                <div class="user-menu-header">
                    ${buildAvatarMarkup(user)}
                    <div class="user-menu-meta">
                        <strong>${fullName}</strong>
                        <small>${email}</small>
                    </div>
                </div>
                <div class="user-menu-actions">
                    <button type="button" data-action="avatar">Configurar foto de perfil</button>
                    <input id="avatarInput" type="file" accept="image/*" hidden>
                    <button type="button" data-action="logout" class="logout-action">Cerrar sesión</button>
                </div>
            </div>
        `;
    }

    function updateUserButton(user) {
        if (!root) {
            return;
        }

        root.innerHTML = user ? buildLoggedMarkup(user) : buildGuestMarkup();

        if (!user) {
            return;
        }

        const trigger = root.querySelector('.user-button');
        const menu = root.querySelector('.user-menu');

        if (!trigger || !menu) {
            return;
        }

        root.onclick = (event) => {
            const action = event.target.closest('[data-action]');
            const avatarInput = document.getElementById('avatarInput');

            if (action) {
                if (action.dataset.action === 'avatar') {
                    avatarInput?.click();
                    return;
                }

                if (action.dataset.action === 'logout') {
                    fetch(logoutUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' }
                    }).then(() => cargarUsuario());
                    return;
                }
            }

            if (event.target.closest('.user-button')) {
                const isHidden = menu.classList.toggle('hidden');
                trigger.setAttribute('aria-expanded', String(!isHidden));
            }
        };

        const avatarInput = document.getElementById('avatarInput');
        avatarInput?.addEventListener('change', async (event) => {
            const file = event.target.files?.[0];
            if (!file) {
                return;
            }

            const dataUrl = await fileToDataUrl(file);
            await fetch(profileUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ avatar: dataUrl })
            });

            await cargarUsuario();
            event.target.value = '';
        });
    }

    function fileToDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('No se pudo leer la imagen'));
            reader.readAsDataURL(file);
        });
    }

    async function cargarUsuario() {
        try {
            const response = await fetch(sessionUrl, { credentials: 'same-origin' });
            const data = await response.json();
            updateUserButton(data.logueado ? data.usuario : null);
        } catch (error) {
            console.error('No se pudo verificar la sesión del usuario:', error);
            updateUserButton(null);
        }
    }

    document.addEventListener('DOMContentLoaded', cargarUsuario);
})();