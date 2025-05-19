<?php
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($path === '/api/properties' && $method === 'GET') {
    echo json_encode([
        ['id' => '1', 'type' => 'landed', 'name' => 'Taman Bukit Indah', 'location' => 'Johor Bahru'],
        ['id' => '2', 'type' => 'condominium', 'name' => 'KLCC Residence', 'location' => 'Kuala Lumpur'],
    ]);
    exit;
}

if ($path === '/api/bookings' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $bookings = [];
    $file = __DIR__ . '/bookings.json';
    if (file_exists($file)) {
        $bookings = json_decode(file_get_contents($file), true);
    }
    $bookings[] = $data;
    file_put_contents($file, json_encode($bookings, JSON_PRETTY_PRINT));
    echo json_encode(['status' => 'ok']);
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Not Found']);
