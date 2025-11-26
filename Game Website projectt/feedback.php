<?php
session_start();

// Block access if user is NOT logged in
if (!isset($_SESSION['name'])) {
    echo "ERROR||Not Allowed||You must be logged in to submit feedback.";
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_SESSION['name']; // Auto-use logged-in username
    $rating = htmlspecialchars($_POST['rating']);
    $message = htmlspecialchars($_POST['message']);

    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "feedback_db";

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        echo "ERROR||Database Connection Failed||" . $conn->connect_error;
        exit;
    }

    $sql = "INSERT INTO feedback (name, rating, message) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sis", $name, $rating, $message);

    if ($stmt->execute()) {
        echo "SUCCESS||Thank you for your feedback!||Your feedback has been recorded successfully.";
    } else {
        echo "ERROR||Submission Failed||Please try again later.";
    }

    $stmt->close();
    $conn->close();

} else {
    echo "ERROR||Invalid Access||This page can only be accessed through the feedback form.";
}
?>
