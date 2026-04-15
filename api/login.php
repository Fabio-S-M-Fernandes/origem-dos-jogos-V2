<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(405, ['error' => 'Método não permitido. Use POST.']);
}

$body = json_decode(file_get_contents('php://input'), true) ?: [];
$email = trim($body['email'] ?? '');
$password = $body['password'] ?? '';

if ($email === '' || $password === '') {
    sendJson(400, ['error' => 'Email e senha são obrigatórios.']);
}

$stmt = $db->prepare('SELECT id, username, email, password, profile, avatar FROM users WHERE email = :email');
$stmt->bindValue(':email', $email, SQLITE3_TEXT);
$result = $stmt->execute();
$user = $result->fetchArray(SQLITE3_ASSOC);

if (!$user || !password_verify($password, $user['password'])) {
    sendJson(400, ['error' => 'Credenciais inválidas.']);
}

unset($user['password']);
sendJson(200, ['user' => $user]);
