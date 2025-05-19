<?php
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$dataFile = __DIR__ . '/data.json';

if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode(['units' => [], 'bookings' => []]));
}
$data = json_decode(file_get_contents($dataFile), true);

$properties = [
    ['id' => '1', 'type' => 'landed', 'name' => 'Taman Bukit Indah', 'location' => 'Johor Bahru'],
    ['id' => '2', 'type' => 'condominium', 'name' => 'KLCC Residence', 'location' => 'Kuala Lumpur'],
];

if ($path === '/api/properties' && $method === 'GET') {
    echo json_encode($properties);
    exit;
}

if ($path === '/api/units' && $method === 'GET') {
    $propertyId = $_GET['propertyId'] ?? null;
    $units = array_values(array_filter($data['units'], fn($u) => $u['propertyId'] === $propertyId));
    echo json_encode($units);
    exit;
}

if ($path === '/api/bookings' && $method === 'POST') {
    $payload = json_decode(file_get_contents('php://input'), true);
    $unitId = $payload['unitId'] ?? null;
    foreach ($data['units'] as &$u) {
        if ($u['id'] === $unitId) {
            if ($u['status'] !== 'available') {
                http_response_code(400);
                echo json_encode(['error' => 'Unit not available']);
                exit;
            }
            $u['status'] = 'booked';
            break;
        }
    }
    unset($u);
    $data['bookings'][] = $payload;
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
    echo json_encode(['status' => 'ok']);
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Not Found']);
