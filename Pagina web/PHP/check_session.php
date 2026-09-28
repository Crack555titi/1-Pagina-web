<?php
// php/check_session.php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['usuario_id'])) {
    echo json_encode([
        'logueado' => true,
        'nombre' => $_SESSION['usuario_nombre'] ?? 'Usuario'
    ]);
} else {
    echo json_encode([
        'logueado' => false
    ]);
}
exit();
?>