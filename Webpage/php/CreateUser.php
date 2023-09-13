<?php
include 'db_connection.php';

$errors = [];
$data = [];

if (empty($_POST['username'])) {
    $errors['username'] = 'Username is required.';
}

if(empty($_POST['role']) || ($_POST['role'] != "Administrador" && $_POST['role'] != "Empleado"))
{
    $errors['role'] = 'Role is not valid.';
}

if (empty($_POST['email'])) {
    $errors['email'] = 'Email is required.';
}

if (empty($_POST['password'])) {
    $errors['password'] = 'Password is required.';
}

if (empty($_POST['phone'])) {
    $errors['phone'] = 'Phone is required.';
}

if (empty($_POST['birthday'])) {
    $errors['birthday'] = 'Birthday is required.';
}


if (!empty($errors)) 
{
    $data['success'] = false;
    $data['errors'] = $errors;
} 
else 
{   
    $username = $_POST['username'];
    if($_POST['role'] == "Administrador")
    {
        $role = 1;
    }
    if($_POST['role'] == "Empleado")
    {
        $role = 2;
    }
    $email = $_POST['email'];
    $password = $_POST['password'];
    $phone = $_POST['phone'];
    $birthday = $_POST['birthday'];
    
    $conn = OpenCon();
        $data['success'] = mysqli_query($conn, "INSERT INTO T_USER(USERNAME, FK_ROLE, EMAIL, PASSWORD, PHONE, BIRTHDAY) VALUES('$username', $role, '$email', '$password', '$phone', '$birthday')");
    CloseCon($conn);
}

echo json_encode($data);
