<?php
$name = filter_input(INPUT_POST, 'name');
$interests = filter_input(INPUT_POST, 'interests');
if (!empty($name)){
if (!empty($interests)){
$host = "localhost";
$dbusername = "root";
$dbpassword = "StudioCoderAEMR4$";
$dbname = "seniors_connect";
// Create connection
$conn = new mysqli ($host, $dbusername, $dbpassword, $dbname);

if (mysqli_connect_error()){
die('Connect Error ('. mysqli_connect_errno() .') '
. mysqli_connect_error());
}
else{
$sql = "INSERT INTO volunteerInfo (name)
values ('$name')";
if ($conn->query($sql)){
echo "New record is inserted sucessfully";
}
else{
echo "Error: ". $sql ."
". $conn->error;
}
$conn->close();
}
}
else{
echo "Name should not be empty";
die();
}
}
else{
echo "Interests should not be empty";
die();
}
?>
