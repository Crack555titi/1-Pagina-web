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
    if (substr($avatar, 0, 11) !== 'data:image/') {
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
    $nombre = trim($input['nombre']); $apellido = trim($input['apellido'] ?? '');
    $db = $db ?? new PDO("mysql:host=localhost;dbname=mi_paginaweb;charset=utf8mb4", 'root', '');
    $stmt = $db->prepare("UPDATE usuarios SET nombre=:n, apellido=:a WHERE id=:id");
    $stmt->execute([':n'=>$nombre, ':a'=>$apellido, ':id'=>$_SESSION['usuario_id']]);
    $_SESSION['usuario_nombre'] = $nombre; $_SESSION['usuario_apellido'] = $apellido;
}
if (!empty($input['password'])) {
    if (strlen($input['password']) < 8) { echo json_encode(['exito'=>false,'mensaje'=>'La contraseña debe tener al menos 8 caracteres.']); exit(); }
    $db = $db ?? new PDO("mysql:host=localhost;dbname=mi_paginaweb;charset=utf8mb4", 'root', '');
    $stmt=$db->prepare('UPDATE usuarios SET password=:p WHERE id=:id');
    $stmt->execute([':p'=>password_hash($input['password'], PASSWORD_DEFAULT), ':id'=>$_SESSION['usuario_id']]);
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
