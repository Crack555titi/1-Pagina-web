console.log("registro conectado")
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

function validarUsuario() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (email === user.email && password === user.password) {
        console.log("Usuario validado:", user);
        validacion = 1;
    }else {
        console.log("Usuario no válido");
        validacion = 0;
    }
}
    function eliminar_boton_registro() 
{
    console.log("eliminar_boton_registro conectado");
    if (validacion == 0) 
    {
        console.log("eliminar_boton_registro estado 0");
        const elemento = document.querySelector(".register-container") && document.querySelector(".login-container");
        if (elemento) {
            console.log("eliminar_boton_registro elemento encontrado");
            elemento.remove();
        }
    }
}

