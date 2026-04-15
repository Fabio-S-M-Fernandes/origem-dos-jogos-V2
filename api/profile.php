<?php
require_once __DIR__ . '/config.php';

$id = intval($_GET['id'] ?? 0);
if ($id <= 0) {
    sendJson(400, ['error' => 'ID de usuário inválido.']);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $db->prepare('SELECT id, username, email, profile, avatar FROM users WHERE id = :id');
    $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
    $result = $stmt->execute();
    $user = $result->fetchArray(SQLITE3_ASSOC);
    if (!$user) {
        sendJson(404, ['error' => 'Usuário não encontrado.']);
    }
    sendJson(200, $user);
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $body = json_decode(file_get_contents('php://input'), true) ?: [];
    $profile = trim($body['profile'] ?? '');
    $avatar = trim($body['avatar'] ?? '');

    $stmt = $db->prepare('UPDATE users SET profile = :profile, avatar = :avatar WHERE id = :id');
    $stmt->bindValue(':profile', $profile, SQLITE3_TEXT);
    $stmt->bindValue(':avatar', $avatar, SQLITE3_TEXT);
    $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
    $result = $stmt->execute();

    if ($db->changes() === 0) {
        sendJson(404, ['error' => 'Usuário não encontrado ou nada para atualizar.']);
    }

    sendJson(200, ['message' => 'Perfil atualizado com sucesso.']);
}

sendJson(405, ['error' => 'Método não permitido.']);
