window.addEventListener("DOMContentLoaded", () => {
    fetch('comprobar_sesion.php')
    .then(respuesta => respuesta.json())
    .then(data => {
        if (data.logueado === true) {
            console.log("¡Sesión detectada en el servidor!");
            const contenedorRegistro = document.querySelector(".register-container");
            const contenedorLogin = document.querySelector(".login-container");
            
            if (contenedorRegistro) contenedorRegistro.remove();
            if (contenedorLogin) contenedorLogin.remove();
        } else {
            console.log("No hay sesión activa. Mostrando formularios de ingreso.");
        }
    })
    .catch(error => {
        console.error("Error al comprobar la sesión:", error);
    });
});
console.log("registro conectado");

let user = {
    nombre: "",
    apellido: "",
    email: "",
    password: ""
};

let validacion = 0;

function registrarUsuario() 
{
    user.nombre = document.getElementById("nombre").value;
    user.apellido = document.getElementById("apellido").value;
    user.email = document.getElementById("email").value;
    user.password = document.getElementById("password").value;

    console.log("Usuario registrado:", user);
}

// 1. AQUÍ ESTÁ EL CAMBIO IMPORTANTE:
function validarUsuario() {
    let emailInput = document.getElementById("email").value;
    let passwordInput = document.getElementById("password").value;
    
    // Guardamos los datos que escribió el usuario en un paquetito
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
            console.log("¡Usuario validado por PHP y SQLite!");
            validacion = data.validacion; 
        } else {
            console.log("Usuario no válido según la base de datos");
            validacion = 0;
        }

        eliminar_boton_registro();
    })
    .catch(error => {
        console.error("Hubo un error al conectar con PHP:", error);
    });
}

function eliminar_boton_registro() 
{
    console.log("eliminar_boton_registro conectado");
    
    if (validacion == 1) 
    {
        console.log("eliminar_boton_registro estado 1 (Usuario Válido)");
        const contenedorRegistro = document.querySelector(".register-container");
        const contenedorLogin = document.querySelector(".login-container");

        if (contenedorRegistro) {
            contenedorRegistro.remove();
            console.log("Contenedor de registro eliminado");
        }
        
        if (contenedorLogin) {
            contenedorLogin.remove();
            console.log("Contenedor de login eliminado");
        }
    }
}