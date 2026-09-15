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

        // Verificar si el correo ya existe
        $stmt_check = $db->prepare("SELECT id FROM usuarios WHERE email = :email");
        $stmt_check->execute([':email' => $email]);

        if ($stmt_check->rowCount() > 0) {
            $respuesta["mensaje"] = "El correo electrónico ya está registrado.";
        } else {
            $sql = "INSERT INTO usuarios (nombre, apellido, email, password, validacion) VALUES (:nombre, :apellido, :email, :password, 0)";
            $stmt = $db->prepare($sql);
            $stmt->execute([
                ':nombre' => $nombre,
                ':apellido' => $apellido,
                ':email' => $email,
                ':password' => $password
            ]);

            $respuesta["exito"] = true;
            $respuesta["mensaje"] = "¡Usuario registrado con éxito!";
        }
    }

    // --- CASO 2: LOGIN ---
    if ($accion === 'login') {
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        $stmt = $db->prepare("SELECT * FROM usuarios WHERE email = :email");
        $stmt->execute([':email' => $email]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && $password === $usuario['password']) {
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['usuario_nombre'] = $usuario['nombre'];

            $respuesta["exito"] = true;
            $respuesta["valido"] = true;
            $respuesta["validacion"] = (int)$usuario['validacion'];
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