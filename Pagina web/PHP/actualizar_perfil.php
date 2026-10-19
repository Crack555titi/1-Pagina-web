<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['exito' => false, 'mensaje' => 'Usuario no autenticado.']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
$avatar = $input['avatar'] ?? null;

if ($avatar) {
    if (!str_starts_with($avatar, 'data:image/')) {
        echo json_encode(['exito' => false, 'mensaje' => 'Formato de imagen no válido.']);
        exit();
    }

    $db = new PDO("mysql:host=localhost;dbname=mi_paginaweb;charset=utf8", 'root', '');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $db->prepare("UPDATE usuarios SET avatar = :avatar WHERE id = :id");
    $stmt->execute([
        ':avatar' => $avatar,
        ':id' => $_SESSION['usuario_id']
    ]);

    $_SESSION['usuario_avatar'] = $avatar;
}

if (isset($input['nombre']) && trim($input['nombre']) !== '') {
    $_SESSION['usuario_nombre'] = trim($input['nombre']);
}

if (isset($input['apellido']) && trim($input['apellido']) !== '') {
    $_SESSION['usuario_apellido'] = trim($input['apellido']);
}

echo json_encode([
    'exito' => true,
    'usuario' => [
        'id' => (int)$_SESSION['usuario_id'],
        'nombre' => $_SESSION['usuario_nombre'] ?? '',
        'apellido' => $_SESSION['usuario_apellido'] ?? '',
        'email' => $_SESSION['usuario_email'] ?? '',
        'avatar' => $_SESSION['usuario_avatar'] ?? ''
    ]
]);
exit();
?>
