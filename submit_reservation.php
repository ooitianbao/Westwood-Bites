<?php
include 'data.php';

// --- 调试开始：如果 HTML 成功找到了这个文件，页面会直接停在这里并显示这句话 --
// -------------------------------------------------------------------------

// 下面的代码暂时不会被执行，直到你把上面那行 die 删除
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 接收数据
    $name     = $conn->real_escape_string($_POST["full_name"]);
    $phone    = $conn->real_escape_string($_POST["phone_number"]);
    $email    = $conn->real_escape_string($_POST["email"]);
    $date     = $conn->real_escape_string($_POST["booking_date"]);
    $time     = $conn->real_escape_string($_POST["booking_time"]);
    $people   = $conn->real_escape_string($_POST["guests"]);
    $occasion = $conn->real_escape_string($_POST["occasion"]);
    $request  = $conn->real_escape_string($_POST["special_requests"]);

    // 插入数据库
    $sql = "INSERT INTO reservations (full_name, phone_number, email, booking_date, booking_time, guests, occasion, special_requests) 
            VALUES ('$name', '$phone', '$email', '$date', '$time', '$people', '$occasion', '$request')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>
                alert('Reservation successful!');
                window.location.href='index_new.html';
              </script>";
    } else {
        echo "Database Error: " . $conn->error;
    }

    $conn->close();
    exit();
}
?>
