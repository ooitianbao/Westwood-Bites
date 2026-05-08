<?php
include 'data.php';

// 1. Fetch all reservation data, newest first
$sql = "SELECT * FROM reservations ORDER BY created_at DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Westwood Bites | Admin Dashboard</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #121212; /* Dark theme */
            color: #e0e0e0;
            margin: 0;
            padding: 40px;
        }

        .container {
            max-width: 1200px;
            margin: auto;
        }

        h2 {
            text-align: center;
            color: #ffcc00; /* Gold accents */
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 30px;
        }

        .table-wrapper {
            background: #1e1e1e;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }

        th {
            background-color: #333;
            color: #ffcc00;
            padding: 15px;
            font-size: 14px;
            text-transform: uppercase;
            border-bottom: 2px solid #444;
        }

        td {
            padding: 15px;
            border-bottom: 1px solid #333;
            font-size: 14px;
        }

        tr:nth-child(even) {
            background-color: #252525;
        }

        tr:hover {
            background-color: #2c2c2c;
            transition: 0.3s;
        }

        .btn-delete {
            background-color: #cc3300;
            color: white;
            padding: 6px 12px;
            text-decoration: none;
            border-radius: 4px;
            font-size: 12px;
            transition: 0.3s;
        }

        .btn-delete:hover {
            background-color: #ff4400;
            box-shadow: 0 0 8px rgba(204, 51, 0, 0.6);
        }

        .no-data {
            text-align: center;
            padding: 40px;
            color: #888;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>Reservation Management Dashboard</h2>

    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Date & Time</th>
                    <th>Guests</th>
                    <th>Occasion</th>
                    <th>Special Requests</th>
                    <th>Submitted At</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        echo "<tr>";
                        echo "<td><strong>" . htmlspecialchars($row["full_name"]) . "</strong><br><small>" . htmlspecialchars($row["email"]) . "</small></td>";
                        echo "<td>" . htmlspecialchars($row["phone_number"]) . "</td>";
                        echo "<td>" . $row["booking_date"] . "<br>" . $row["booking_time"] . "</td>";
                        echo "<td>" . $row["guests"] . " Pax</td>";
                        echo "<td>" . htmlspecialchars($row["occasion"]) . "</td>";
                        echo "<td>" . htmlspecialchars($row["special_requests"]) . "</td>";
                        echo "<td>" . date('M d, H:i', strtotime($row["created_at"])) . "</td>";
                        echo "<td>
                                <a href='delete.php?id=" . $row["id"] . "' 
                                   class='btn-delete' 
                                   onclick='return confirm(\"Are you sure you want to delete this reservation?\")'>Delete</a>
                              </td>";
                        echo "</tr>";
                    }
                } else {
                    echo "<tr><td colspan='8' class='no-data'>No reservations found.</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</div>

</body>
</html>

<?php $conn->close(); ?>
