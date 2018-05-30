<?php

$email = $_POST['value'];

$conn = new mysqli('mysql.hostinger.com.ua', 'u494497860_ando', '123q23', 'u494497860_email');

if ($db->connect_errno > 0) {
	die('Could not connect: ' . mysql_error());
}

$sql= "INSERT INTO emails (email) VALUES ('$email')";
$result = $conn->query($sql);

if ($result === TRUE) {
    echo "TRUE";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>	