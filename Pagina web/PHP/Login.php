<?php
// login.php (Puente)
session_start();
header('Content-Type: application/json');

$json_recibido = file_get_contents('php://input');
$datos = json_decode($json_recibido, true);

// Indicamos que la acción es login
$datos['accion'] = 'login';

// RUTA CORREGIDA: Incluye 1-Pagina-web y %20 para el espacio
$ch = curl_init('http://localhost/1-Pagina-web/Pagina%20web/Server.php');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($datos));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);

// Control para evitar respuestas vacías si cURL falla
if ($response === false) {
    echo json_encode(['valido' => false, 'error' => curl_error($ch)]);
    curl_close($ch);
    exit();
}

curl_close($ch);

echo $response;
exit();
?>