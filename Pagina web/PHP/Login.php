<?php
// login.php

// 1. Iniciamos las sesiones para recordar al usuario
session_start();

// 2. Leemos el paquete JSON que envió tu código JavaScript
$json_recibido = file_get_contents('php://input');
$datos = json_decode($json_recibido, true);

// Preparamos la respuesta por defecto en caso de que algo falle
$respuesta = [
    "valido" => false,
    "validacion" => 0
];

// 3. Revisamos si el JavaScript nos mandó el email y la contraseña
if (isset($datos['email']) && isset($datos['password'])) {
    $email_ingresado = $datos['email'];
    $password_ingresada = $datos['password'];

    try {
        // --- CAMBIO CLAVE: CONEXIÓN A MYSQL (PHPMYADMIN) ---
        $host = 'localhost';
        $dbname = 'mi_paginaweb'; // El nombre que le pusiste a tu base de datos
        $username = 'root';       // El usuario por defecto de XAMPP
        $password_db = '';        // La contraseña por defecto de XAMPP (vacía)

        // Creamos la conexión a MySQL
        $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password_db);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // 5. Buscamos al usuario por su correo electrónico
        $stmt = $db->prepare("SELECT * FROM usuarios WHERE email = :email");
        $stmt->bindParam(':email', $email_ingresado);
        $stmt->execute();
        
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        // Validamos si el usuario existe y si la contraseña coincide perfectamente
        if ($usuario && $password_ingresada === $usuario['password']) {
            
            // Guardamos los datos en la sesión del servidor para el inicio de sesión
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['usuario_nombre'] = $usuario['nombre'];

            // Llenamos la respuesta con los datos que tu JavaScript necesita para eliminar el botón
            $respuesta['valido'] = true;
            $respuesta['validacion'] = (int)$usuario['validacion']; // Esto enviará el número de validación (1)
        }

    } catch (PDOException $e) {
        // Si hay un error de conexión, descomenta la línea de abajo para ver el error en la consola si falla
        // $respuesta['error_de_conexion'] = $e->getMessage();
    }
}

// 7. Le decimos al navegador que respondemos con un formato JSON
header('Content-Type: application/json');

// 8. Enviamos la respuesta de vuelta a tu función fetch() en JavaScript
echo json_encode($respuesta);
exit();
?>