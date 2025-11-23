<?php

if($_SERVER ["REQUEST_METHOD"]== "POST"){
    $name = htmlspecialchars($_POST['name']);
    $rating = htmlspecialchars($_POST['rating']);
    $message = htmlspecialchars($_POST['message']);
    

$servername = "localhost";
$username="root";
$password="";
$database="feedback_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
 
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO feedback (name, rating, message) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sis",$name,$rating,$message);

if($stmt->execute()){
    echo "SUCCESS||thankyou for your feedback!||your feedback has been recorded successfully.";
} else {
    echo "ERROR||could not submit form||please try again later.";
}
$stmt->close();
$conn->close();
} else {
echo "ERROR||invalid access||this page is only accessible through the feedback form";
}

?>