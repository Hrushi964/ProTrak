<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$host = 'localhost';
$dbname = 'protrak';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Fetch user details
        $userId = $_GET['userId'] ?? 1; // Default to user 1 if not specified
        $stmt = $conn->prepare("SELECT full_name, email, mobile_number, role FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            echo json_encode(['status' => 'success', 'data' => $user]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'User not found']);
        }
    } 
    else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Update user details
        $data = json_decode(file_get_contents('php://input'), true);
        $userId = $data['userId'] ?? 1; // Default to user 1 if not specified
        
        $stmt = $conn->prepare("UPDATE users SET full_name = ?, email = ?, mobile_number = ?, role = ? WHERE id = ?");
        $result = $stmt->execute([
            $data['fullName'],
            $data['email'],
            $data['mobile'],
            $data['role'],
            $userId
        ]);
        
        if ($result) {
            echo json_encode(['status' => 'success', 'message' => 'User details updated successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update user details']);
        }
    }
} catch(PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
