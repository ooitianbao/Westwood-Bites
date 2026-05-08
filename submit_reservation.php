<?php
include 'data.php'; // 引入数据库连接

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 接收数据并防止 SQL 注入
    $name    = $conn->real_escape_string($_POST["full_name"]);
    $phone   = $conn->real_escape_string($_POST["phone_number"]);
    $email   = $conn->real_escape_string($_POST["email"]);
    $date    = $conn->real_escape_string($_POST["booking_date"]);
    $time    = $conn->real_escape_string($_POST["booking_time"]);
    $people  = $conn->real_escape_string($_POST["guests"]);
    $occasion = $conn->real_escape_string($_POST["occasion"]);
    $request = $conn->real_escape_string($_POST["special_requests"]);

    // 插入数据库的 SQL
    $sql = "INSERT INTO reservations (full_name, phone_number, email, booking_date, booking_time, guests, occasion, special_requests) 
            VALUES ('$name', '$phone', '$email', '$date', '$time', '$people', '$occasion', '$request')";

    if ($conn->query($sql) === TRUE) {
        echo "预约成功！数据已存入数据库。";
    } else {
        echo "错误: " . $conn->error;
    }

    $conn->close();
    exit;
}
?>