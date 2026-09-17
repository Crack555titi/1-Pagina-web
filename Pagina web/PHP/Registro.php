<?php
// php/registro.php (Puente de registro)
session_start();
header('Content-Type: application/json');

$json_recibido = file_get_contents('php://input');
$datos = json_decode($json_recibido, true);

// Definimos la acción para el Server.php
$datos['accion'] = 'registro';

// RUTA COMPLETA Y CORREGIDA
$ch = curl_init('http://localhost/1-Pagina-web/Pagina%20web/Server.php');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($datos));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);

if ($response === false) {
    echo json_encode(['exito' => false, 'mensaje' => 'Error cURL: ' . curl_error($ch)]);
    curl_close($ch);
    exit();
}

curl_close($ch);

echo $response;
exit();
?>