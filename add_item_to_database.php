<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = new mysqli("yzgaming-server.mysql.database.azure.com", "jhbvboxexz", "7O4P3407D6174D76$", "yzgaming-database");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $name = $_POST['name'];
    $price = $_POST['price'];
    $category_id = $_POST['category_id'];
    $platform = $_POST['platform'];

    $sql = "INSERT INTO video_games (name, price, category_id, platform) VALUES (?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssis", $name, $price, $category_id, $platform);

    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}

?>
