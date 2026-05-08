<?php
include 'data.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 接收并清理数据
    $name    = $conn->real_escape_string($_POST["full_name"]);
    $phone   = $conn->real_escape_string($_POST["phone_number"]);
    $email   = $conn->real_escape_string($_POST["email"]);
    $date    = $conn->real_escape_string($_POST["booking_date"]);
    $time    = $conn->real_escape_string($_POST["booking_time"]);
    $people  = $conn->real_escape_string($_POST["guests"]);
    $occasion = $conn->real_escape_string($_POST["occasion"]);
    $request = $conn->real_escape_string($_POST["special_requests"]);

    $sql = "INSERT INTO reservations (full_name, phone_number, email, booking_date, booking_time, guests, occasion, special_requests) 
            VALUES ('$name', '$phone', '$email', '$date', '$time', '$people', '$occasion', '$request')";

    if ($conn->query($sql) === TRUE) {
        // 成功后弹窗并跳回首页，保护隐私
        echo "<script>
                alert('预约成功！我们会尽快联系您。');
                window.location.href='index_new.html'; 
              </script>";
    } else {
        echo "提交失败，请联系管理员: " . $conn->error;
    }

    $conn->close();
    exit;
    ini_set('display_errors', 1);
error_reporting(E_ALL);
}
?>
