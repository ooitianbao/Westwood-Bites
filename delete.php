<?php
include 'data.php';

if (isset($_GET["id"])) {
    $id = intval($_GET["id"]);
    $sql = "DELETE FROM reservations WHERE id = $id";
    
    if ($conn->query($sql) === TRUE) {
        header("Location: admin.php");
    } else {
        echo "删除失败: " . $conn->error;
    }
}
$conn->close();
?>
