<?php
session_start();

// respuesta diciendo que NO está logueado
$respuesta = [
    "logueado" => false
];

//  Si existe la sesión del usuario, cambiamos la respuesta a TRUE
if (isset($_SESSION['usuario_id'])) {
    $respuesta["logueado"] = true;
}

header('Content-Type: application/json');
echo json_encode($respuesta);//respondemos en json
exit();
?>