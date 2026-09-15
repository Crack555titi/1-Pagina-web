<?php
// Server.php (como intermediario para MySQL)
session_start();
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

$respuesta = [
    "valido" => false,
    "validacion" => 0
];

if (!empty($email) && !empty($password)) {
    try {
         // Conexión a tu MySQL (phpMyAdmin)
        $host = 'localhost';
        $dbname = 'mi_paginaweb';
        $username = 'root';
        $password_db = '';

        $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password_db);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Buscamos al usuario en la tabla
        $sql = "SELECT * FROM usuarios WHERE email = :email";
        $stmt = $db->prepare($sql);
        $stmt->execute([':email' => $email]);
        
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        // Validamos si existe y si la contraseña coincide
        if ($usuario && $password === $usuario['password']) {
            
            // Guardamos la sesión para que "comprobar_sesion.php" la detecte
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['usuario_nombre'] = $usuario['nombre'];

            $respuesta["valido"] = true;
            $respuesta["validacion"] = (int)$usuario['validacion'];
        }

    } catch (PDOException $e) {
        $respuesta["error"] = $e->getMessage();
    }
}

echo json_encode($respuesta);
exit();
?>