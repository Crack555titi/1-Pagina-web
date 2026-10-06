function getPhpBasePath() {
    return window.location.pathname.includes('/pages/') ? '..' : '.';
}

function validarUsuario(event) {
    if (event) {
        event.preventDefault();
    }

    let emailInput = document.getElementById("email").value;
    let passwordInput = document.getElementById("password").value;

    let datosAEnviar = {
        email: emailInput,
        password: passwordInput
    };

    fetch(`${getPhpBasePath()}/PHP/Login.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosAEnviar)
    })
    .then(respuesta => respuesta.json())
    .then(data => {
        if (data.valido === true) {
            if (data.validacion === 1) {
                window.location.href = `${getPhpBasePath()}/index.html`;
            } else {
                alert("Tu cuenta aún no está validada.");
            }
        } else {
            alert("Email o contraseña incorrectos");
        }
    })
    .catch(error => {
        console.error("Hubo un error al conectar con PHP:", error);
    });
}

function registrarUsuario(event) {
    if (event) {
        event.preventDefault();
    }

    let nombreInput = document.getElementById("nombre").value;
    let apellidoInput = document.getElementById("apellido").value;
    let emailInput = document.getElementById("email").value;
    let passwordInput = document.getElementById("password").value;
    let confirmPasswordInput = document.getElementById("confirmPassword").value;

    if (passwordInput !== confirmPasswordInput) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    let datosAEnviar = {
        nombre: nombreInput,
        apellido: apellidoInput,
        email: emailInput,
        password: passwordInput
    };

    fetch(`${getPhpBasePath()}/PHP/Registro.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosAEnviar)
    })
    .then(respuesta => respuesta.json())
    .then(data => {
        if (data.exito === true || data.valido === true) {
            alert("¡Cuenta creada con éxito!");
            localStorage.setItem("usuario_nombre", data.usuario?.nombre || nombreInput);
            window.location.href = `${getPhpBasePath()}/index.html`;
        } else {
            alert("Error: " + (data.mensaje || "No se pudo completar el registro."));
        }
    })
    .catch(error => {
        console.error("Hubo un error al conectar con PHP:", error);
    });
}