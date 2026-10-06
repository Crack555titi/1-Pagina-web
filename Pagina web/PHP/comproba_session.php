<?php
session_start();

// Respuesta inicial
$respuesta = [
    "logueado" => false
];

// Si existe la sesión del usuario, devolvemos su información
if (isset($_SESSION['usuario_id'])) {
    $respuesta["logueado"] = true;
    $respuesta["nombre"] = $_SESSION['usuario_nombre'] ?? "Usuario";
    $respuesta["imagen"] = $_SESSION['usuario_imagen'] ?? "default.png"; // Imagen por defecto
}

header('Content-Type: application/json');
echo json_encode($respuesta);
exit();
?>