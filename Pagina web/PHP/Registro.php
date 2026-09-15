<?php
// registro.php (Puente)
session_start();
header('Content-Type: application/json');

$json_recibido = file_get_contents('php://input');
$datos = json_decode($json_recibido, true);

//etiqueta de acción para que el Server sepa qué hacer
$datos['accion'] = 'registrar';

// envia petición a Server.php usando cURL interno
$ch = curl_init('http://localhost/Pagina web/Server.php'); // Ajusta la ruta si es necesario
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($datos));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);
curl_close($ch);

// Devolvemos la respuesta del serv
echo $response;
exit();
?>