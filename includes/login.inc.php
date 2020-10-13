<?php

session_start();

if(isset($_POST['submit'])) {

  $username = $_POST["username"];
  $password = $_POST["password"];

  if(!strlen($username) > 0 || !strlen($password) > 0) {
    header("Location: ../error.php");
  }
  else if($username === "admin" && $password === "mypass")
  {
    $_SESSION["login"] = "true";
    header("Location: ../index.php");
  }



}

?>
