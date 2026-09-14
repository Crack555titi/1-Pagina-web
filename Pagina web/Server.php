<?php



header ('Content-Type: application/json');


$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

try {
    
    $db = new PDO('sqlite:sistema_usuarios.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

   
    $sql = "SELECT validacion FROM usuarios WHERE email = :email AND password = :password";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':email' => $email,
        ':password' => $password
    ]);

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

  
    if ($row) {
        echo json_encode([
            "valido" => true,
            "validacion" => (int)$row['validacion']
        ]);
    } else {
        echo json_encode([
            "valido" => false,
            "validacion" => 0
        ]);
    }

} catch (PDOException $e) {
    
    echo json_encode([
        "valido" => false,
        "error" => $e->getMessage()
    ]);
}
?>
