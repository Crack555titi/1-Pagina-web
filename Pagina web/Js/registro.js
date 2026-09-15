function validarUsuario() {
    let emailInput = document.getElementById("email").value;
    let passwordInput = document.getElementById("password").value;
    
    let datosAEnviar = {
        email: emailInput,
        password: passwordInput
    };

    console.log("Enviando datos a PHP...");

    fetch('login.php', {
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
            validacion = data.validacion; 
            eliminar_boton_registro(); // Llamamos acá adentro cuando ya es seguro
        } else {
            console.log("Usuario o contraseña incorrectos");
            alert("Datos incorrectos");
        }
    })
    .catch(error => {
        console.error("Hubo un error al conectar con PHP:", error);
    });
}