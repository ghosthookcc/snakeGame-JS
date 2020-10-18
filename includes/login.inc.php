<?php

session_start();

include_once("connect.inc.php");

if(isset($_POST['submit'])) {

  $username = $_POST["username"];
  $password = $_POST["password"];

  if(!strlen($username) > 0 || !strlen($password) > 0) {
    header("Location: ../error.php");
  }
  else
  {
    $query = "SELECT username, pwd FROM users WHERE username=? AND pwd=?";
    $statement = $pdo->prepare($query);

    $statement->execute([$username, $password]);

    if($statement->rowCount() > 0) 
    {
      foreach($statement as $row)   
      {
        $usernameRow = $row["username"];
        $passwordRow = $row["pwd"];

        if($usernameRow === $username && $passwordRow === $password) 
        {
          $_SESSION["login"] = "true";
          header("Location: ../index.php");
        }
      } 
    } else {
      header("Location: ../error.php");      
    }
  }
}

?>
