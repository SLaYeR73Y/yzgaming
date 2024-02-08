<?php
$conn = new mysqli("localhost", "root", "lW-lYfoYuEdCy95x", "my_shop");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['query']) && isset($_GET['category'])) {
    $query = $_GET['query'];
    $category = $_GET['category'];

    if ($category === 'Everything') {
        // Search in both video_games and controllers
        $stmtVideoGames = $conn->prepare("SELECT id, name, price FROM video_games WHERE name LIKE ? OR platform LIKE ?");
        $stmtControllers = $conn->prepare("SELECT id, name, price FROM controllers WHERE name LIKE ? OR color LIKE ?");
    } else if ($category === 'Video Games') {
        // Search only in video_games
        $stmtVideoGames = $conn->prepare("SELECT id, name, price FROM video_games WHERE name LIKE ? OR platform LIKE ?");
    } else if ($category === 'Controllers') {
        // Search only in controllers
        $stmtControllers = $conn->prepare("SELECT id, name, price FROM controllers WHERE name LIKE ? OR color LIKE ?");
    }

    $searchTerm = "%" . $query . "%";

    if (isset($stmtVideoGames)) {
        $stmtVideoGames->bind_param("ss", $searchTerm, $searchTerm);
        $stmtVideoGames->execute();
        $stmtVideoGames->bind_result($idVideoGames, $nameVideoGames, $priceVideoGames);

        while ($stmtVideoGames->fetch()) {
            echo "<div><a href='VIDEOGAMES.html#product{$idVideoGames}'>{$nameVideoGames} - {$priceVideoGames}$ (Video Games)</a></div>";
        }

        $stmtVideoGames->close();
    }

    if (isset($stmtControllers)) {
        $stmtControllers->bind_param("ss", $searchTerm, $searchTerm);
        $stmtControllers->execute();
        $stmtControllers->bind_result($idControllers, $nameControllers, $priceControllers);

        while ($stmtControllers->fetch()) {
            echo "<div><a href='Controllers.html#product{$idControllers}'>{$nameControllers} - {$priceControllers}$ (Controllers)</a></div>";
        }

        $stmtControllers->close();
    }
}

$conn->close();
?>
