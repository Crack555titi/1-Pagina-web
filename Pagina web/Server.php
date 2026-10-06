<?php
// Server.php (Intermediario central para la base de datos)
session_start();
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$accion = $input['accion'] ?? ''; // Identificamos si nos piden 'login' o 'registrar'

$respuesta = [
    "exito" => false,
    "mensaje" => "Acción no válida."
];

try {
    // Conexión única a tu base de datos MySQL
    $host = 'localhost';
    $dbname = 'mi_paginaweb';
    $username = 'root';
    $password_db = '';

    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password_db);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // --- CASO 1: REGISTRAR USUARIO ---
    if ($accion === 'registrar') {
        $nombre = $input['nombre'] ?? '';
        $apellido = $input['apellido'] ?? '';
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        $stmt_check = $db->prepare("SELECT id FROM usuarios WHERE email = :email");
        $stmt_check->execute([':email' => $email]);

        if ($stmt_check->rowCount() > 0) {
            $respuesta["mensaje"] = "El correo electrónico ya está registrado.";
        } else {
            $sql = "INSERT INTO usuarios (nombre, apellido, email, password, validacion) VALUES (:nombre, :apellido, :email, :password, 1)";
            $stmt = $db->prepare($sql);
            $stmt->execute([
                ':nombre' => $nombre,
                ':apellido' => $apellido,
                ':email' => $email,
                ':password' => $password
            ]);

            $usuarioId = (int)$db->lastInsertId();
            $_SESSION['usuario_id'] = $usuarioId;
            $_SESSION['usuario_nombre'] = $nombre;
            $_SESSION['usuario_apellido'] = $apellido;
            $_SESSION['usuario_email'] = $email;
            $_SESSION['usuario_avatar'] = $_SESSION['usuario_avatar'] ?? '';

            $respuesta["exito"] = true;
            $respuesta["mensaje"] = "¡Usuario registrado con éxito!";
            $respuesta["usuario"] = [
                "id" => $usuarioId,
                "nombre" => $nombre,
                "apellido" => $apellido,
                "email" => $email,
                "avatar" => $_SESSION['usuario_avatar']
            ];
        }
    }

    if ($accion === 'login') {
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        $stmt = $db->prepare("SELECT * FROM usuarios WHERE email = :email");
        $stmt->execute([':email' => $email]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && $password === $usuario['password']) {
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['usuario_nombre'] = $usuario['nombre'];
            $_SESSION['usuario_apellido'] = $usuario['apellido'];
            $_SESSION['usuario_email'] = $usuario['email'];
            $_SESSION['usuario_avatar'] = $_SESSION['usuario_avatar'] ?? '';

            $respuesta["exito"] = true;
            $respuesta["valido"] = true;
            $respuesta["validacion"] = (int)$usuario['validacion'];
            $respuesta["mensaje"] = "Login correcto";
            $respuesta["usuario"] = [
                "id" => (int)$usuario['id'],
                "nombre" => $usuario['nombre'],
                "apellido" => $usuario['apellido'],
                "email" => $usuario['email'],
                "avatar" => $_SESSION['usuario_avatar']
            ];
        } else {
            $respuesta["mensaje"] = "Credenciales incorrectas";
        }
    }

} catch (PDOException $e) {
    $respuesta["mensaje"] = "Error de base de datos: " . $e->getMessage();
}

echo json_encode($respuesta);
exit();
?>