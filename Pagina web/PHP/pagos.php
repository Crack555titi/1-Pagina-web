<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['exito' => false, 'mensaje' => 'Usuario no autenticado.']);
    exit();
}

define('MONTO_PAGO', 10);
// Clave para firmar el código del QR de la credencial. CAMBIALA por una frase larga y propia.
define('QR_SECRETO', 'cambiar-esta-clave-por-una-frase-larga');

$uid = (int)$_SESSION['usuario_id'];
$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    $input = [];
}
$accion = $input['accion'] ?? '';

try {
    $db = new PDO("mysql:host=localhost;dbname=mi_paginaweb;charset=utf8", 'root', '');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($accion === 'registrar') {
        $concepto = $input['concepto'] ?? '';
        $ref = trim($input['pago_ref'] ?? '');

        $conceptoValido = preg_match('/^(plan:(individual|familiar|estudiante|jubilado):(una|todas)|deporte:[a-z0-9-]+)$/', $concepto);
        if (!$conceptoValido || $ref === '' || strlen($ref) > 64) {
            echo json_encode(['exito' => false, 'mensaje' => 'Datos de pago no válidos.']);
            exit();
        }

        // Un número de operación solo puede usarse una vez
        $check = $db->prepare("SELECT id FROM pagos WHERE pago_ref = :r");
        $check->execute([':r' => $ref]);
        if ($check->fetch()) {
            echo json_encode(['exito' => false, 'mensaje' => 'Ese número de operación ya fue registrado.']);
            exit();
        }

        $stmt = $db->prepare("INSERT INTO pagos (usuario_id, concepto, monto, pago_ref, estado)
                              VALUES (:u, :c, :m, :r, 'en_revision')");
        $stmt->execute([':u' => $uid, ':c' => $concepto, ':m' => MONTO_PAGO, ':r' => $ref]);

        echo json_encode(['exito' => true, 'mensaje' => 'Pago enviado a revisión.']);

    } elseif ($accion === 'listar') {
        $stmt = $db->prepare("SELECT concepto, estado FROM pagos WHERE usuario_id = :u ORDER BY id ASC");
        $stmt->execute([':u' => $uid]);
        echo json_encode(['exito' => true, 'pagos' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);

    } elseif ($accion === 'credencial') {
        // El código del QR solo se entrega si el pago del plan ya fue aprobado
        $stmt = $db->prepare("SELECT concepto FROM pagos WHERE usuario_id = :u AND estado = 'aprobado' AND concepto LIKE 'plan:%' ORDER BY id DESC LIMIT 1");
        $stmt->execute([':u' => $uid]);
        $fila = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$fila) {
            echo json_encode(['exito' => false, 'mensaje' => 'Credencial no habilitada.']);
            exit();
        }
        list(, $plan, $alcance) = explode(':', $fila['concepto']);
        $numero = 'AER-' . str_pad((string)$uid, 5, '0', STR_PAD_LEFT);
        $firma = substr(hash_hmac('sha256', $numero . '|' . $fila['concepto'], QR_SECRETO), 0, 16);
        echo json_encode(['exito' => true, 'plan' => $plan, 'alcance' => $alcance, 'codigo' => "AERUS|$numero|$plan|$alcance|$firma"]);

    } else {
        echo json_encode(['exito' => false, 'mensaje' => 'Acción no válida.']);
    }
} catch (PDOException $e) {
    echo json_encode(['exito' => false, 'mensaje' => 'Error de base de datos: ' . $e->getMessage()]);
}
exit();
