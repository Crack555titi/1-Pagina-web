let user = {
    nombre: "",
    apellido: "",
    email: "",
    password: ""
};

function registrarUsuario() {
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
        return true;
    }else {
        console.log("Usuario no válido");
        return false;
    }
}