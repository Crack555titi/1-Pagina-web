<?php
// php/login.php
session_start();
header('Content-Type: application/json');

$json_recibido = file_get_contents('php://input');
$datos = json_decode($json_recibido, true);
$datos['accion'] = 'login';

$ch = curl_init('http://localhost/1-Pagina-web/Pagina%20web/Server.php');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($datos));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);
curl_close($ch);

$resultado = json_decode($response, true);

// Guarda la sesión directamente en las cookies de tu navegador
if (isset($resultado['exito']) && $resultado['exito'] === true) {
    $_SESSION['usuario_id'] = $resultado['usuario_id'];
    $_SESSION['usuario_nombre'] = $resultado['usuario_nombre'];
}

echo $response;
exit();
?>