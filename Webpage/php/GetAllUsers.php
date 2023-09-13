<?php
require "db_connection.php";

$conn = OpenCon();
$query = mysqli_query($conn, "SELECT username, roleName as 'role', email, password, phone, birthday FROM T_User JOIN T_Role ON pk_role = fk_role");

// $data['response'] = mysqli_fetch_all($query);

$i = 0;
$empleados = [];
while($row = mysqli_fetch_assoc($query))
{
    $empleados[$i]['username'] = $row['username'];
    $empleados[$i]['role'] = $row['role'];
    $empleados[$i]['email'] = $row['email'];
    $empleados[$i]['phone'] = $row['phone'];
    $empleados[$i]['birthday'] = $row['birthday'];
    $i++;
}
$data['response'] = $empleados;
$data['success'] = true;
CloseCon($conn);

echo json_encode($data);