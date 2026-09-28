<?php
// Server.php (Intermediario central para la base de datos)
session_start();
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$accion = $input['accion'] ?? '';

$respuesta = [
    "exito" => false,
    "mensaje" => "Acción no válida."
];

try {
    $host = 'localhost';
    $dbname = 'mi_paginaweb';
    $username = 'root';
    $password_db = '';

    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password_db);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // --- REGISTRO ---
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

            $respuesta["exito"] = true;
            $respuesta["valido"] = true;
            $respuesta["usuario_id"] = $db->lastInsertId();
            $respuesta["usuario_nombre"] = $nombre;
            $respuesta["mensaje"] = "¡Usuario registrado e iniciado con éxito!";
        }
    }

    // --- LOGIN ---
    if ($accion === 'login') {
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        $stmt = $db->prepare("SELECT * FROM usuarios WHERE email = :email");
        $stmt->execute([':email' => $email]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && $password === $usuario['password']) {
            $respuesta["exito"] = true;
            $respuesta["valido"] = true;
            $respuesta["usuario_id"] = $usuario['id'];
            $respuesta["usuario_nombre"] = $usuario['nombre'];
            $respuesta["mensaje"] = "Login correcto";
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