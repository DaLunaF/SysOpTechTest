<?php
require "db_connection.php";

$errors = [];
$data = [];

if (empty($_GET['email'])) {
    $errors['email'] = 'Email is required.';
}

if (empty($_GET['password'])) {
    $errors['password'] = 'Password is required.';
}

if (!empty($errors)) 
{
    $data['success'] = false;
    $data['errors'] = $errors;
} 
else 
{
    $email = $_GET['email'];
    $password = $_GET['password'];
    $conn = OpenCon();
    $query = mysqli_query($conn, "SELECT username, roleName as 'role', email, password, phone, birthday FROM T_User JOIN T_Role ON pk_role = fk_role WHERE email = '$email' AND password = '$password'");
    $data['response'] = mysqli_fetch_assoc($query);
    CloseCon($conn);
    $data['success'] = true;
}

echo json_encode($data);