<?php
session_start();

$respuesta = [
    'logueado' => false,
    'usuario' => null
];

if (isset($_SESSION['usuario_id'])) {
    $respuesta['logueado'] = true;
    $respuesta['usuario'] = [
        'id' => (int)$_SESSION['usuario_id'],
        'nombre' => $_SESSION['usuario_nombre'] ?? '',
        'apellido' => $_SESSION['usuario_apellido'] ?? '',
        'email' => $_SESSION['usuario_email'] ?? '',
        'avatar' => $_SESSION['usuario_avatar'] ?? ''
    ];
}

header('Content-Type: application/json');
echo json_encode($respuesta);
exit();
?>