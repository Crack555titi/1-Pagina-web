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

    console.log("Enviando datos a PHP...");

    fetch('../php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(datosAEnviar)
    })
    .then(respuesta => respuesta.json()) 
    .then(data => {
        if (data.valido === true) {
            console.log("¡Usuario validado por PHP y MySQL!");
            
            // Verificamos si su validación es 1 (o la condición que tengas para verificado)
            if (data.validacion === 1) {
                console.log("Usuario verificado. Redirigiendo al index...");
                window.location.href = "../index.html"; 
            } else {
                alert("Tu cuenta aún no está validada.");
            }

        } else {
            console.log("Usuario o contraseña incorrectos");
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

    // Validación de coincidencia de contraseñas
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

    fetch('../php/registro.php', {
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
            window.location.href = "LogIn.html";
        } else {
            alert("Error: " + (data.mensaje || "No se pudo completar el registro."));
        }
    })
    .catch(error => {
        console.error("Hubo un error al conectar con PHP:", error);
    });
}