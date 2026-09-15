<?php
// login.php
session_start();

$json_recibido = file_get_contents('php://input');
$datos = json_decode($json_recibido, true);

$respuesta = [
    "valido" => false,
    "validacion" => 0
];

if (isset($datos['email']) && isset($datos['password'])) {
    $email_ingresado = $datos['email'];
    $password_ingresada = $datos['password'];

    try {
        $host = 'localhost';
        $dbname = 'mi_paginaweb';
        $username = 'root';
        $password_db = '';

        $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password_db);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $db->prepare("SELECT * FROM usuarios WHERE email = :email");
        $stmt->bindParam(':email', $email_ingresado);
        $stmt->execute();
        
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        // Si el usuario existe y la contraseña coincide
        if ($usuario && $password_ingresada === $usuario['password']) {
            
            // ¡IMPORTANTE! Coincide con la variable que busca comprobar_sesion.php
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['usuario_nombre'] = $usuario['nombre'];

            $respuesta['valido'] = true;
            $respuesta['validacion'] = (int)$usuario['validacion']; 
        }

    } catch (PDOException $e) {
        $respuesta['error'] = $e.getMessage();
    }
}

header('Content-Type: application/json');
echo json_encode($respuesta);
exit();
?>