<?php
session_start();
require_once 'config.php';

// ---------------- REGISTER ----------------
if (isset($_POST['register'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password_input = $_POST['password']; // raw password (before hashing)

    $errors = [];

    // Email Format Validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }

    // Password Validation Conditions
    if (strlen($password_input) < 8) {
        $errors[] = "Password must be at least 8 characters long.";
    } elseif (!preg_match("/[0-9]/", $password_input)) {
        $errors[] = "Password must contain at least one number.";
    } elseif (!preg_match("/[A-Z]/", $password_input)) {
        $errors[] = "Password must contain at least one uppercase letter.";
    } elseif (!preg_match("/[a-z]/", $password_input)) {
        $errors[] = "Password must contain at least one lowercase letter.";
    } elseif (!preg_match("/[\W]/", $password_input)) {
        $errors[] = "Password must contain at least one special character.";
    }

    // If validation fails → return to form with errors
    if (!empty($errors)) {
        $_SESSION['register_error'] = implode("<br>", $errors);
        $_SESSION['active_form'] = 'register';
        header("Location: indexlog.php");
        exit();
    }

    // Check if email already exists
    $checkEmail = $conn->query("SELECT email FROM users WHERE email = '$email'");
    if ($checkEmail->num_rows > 0) {
        $_SESSION['register_error'] = 'Email is already registered!';
        $_SESSION['active_form'] = 'register';
        header("Location: indexlog.php");
        exit();
    }

    // Store hashed password after passing validation
    $password = password_hash($password_input, PASSWORD_DEFAULT);

    // Insert new user
    $insert = $conn->query("INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')");
    if ($insert) {
        $_SESSION['name'] = $name;
        $_SESSION['email'] = $email;
        header("Location: ../index.php");
        exit();
    } else {
        $_SESSION['register_error'] = 'Registration failed. Please try again.';
        $_SESSION['active_form'] = 'register';
        header("Location: indexlog.php");
        exit();
    }
}

// ---------------- LOGIN ----------------
if (isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $result = $conn->query("SELECT * FROM users WHERE email = '$email'");
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            $_SESSION['name'] = $user['name'];
            $_SESSION['email'] = $user['email'];
            header("Location: ../index.php");
            exit();
        }
    }

    // If login fails
    $_SESSION['login_error'] = 'Incorrect email or password';
    $_SESSION['active_form'] = 'login';
    header("Location: indexlog.php");
    exit();
}
?>
