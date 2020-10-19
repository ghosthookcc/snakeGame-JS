<?php

session_start();

include_once("connect.inc.php");

if(isset($_POST['submit'])) {

  $username = $_POST['username'];
  $password = $_POST['password'];

  if(!strlen($username) > 0 || !strlen($password) > 0) {
    header("Location: ../error.php");
  }
  else
  {
    $hash;

    $selectHashQuery = "SELECT password FROM users WHERE username=?";
    $statement = $pdo->prepare($selectHashQuery);

    $statement->execute([$username]);

    if($statement->rowCount() > 0)
    {
      $hash = $statement->fetch();
    } else {
      header("Location: ../error.php");
    }

    $query = "SELECT username, password FROM users WHERE username=? AND password=?";
    $statement = $pdo->prepare($query);

    $statement->execute([$username, $hash[0]]);

    if($statement->rowCount() > 0)
    {
      foreach($statement as $row)
      {
        $usernameRow = $row["username"];
        $passwordRow = $row["password"];

        if($usernameRow === $username && password_verify($_POST['password'], $hash[0]))
        {
          $_SESSION["login"] = "true";
          header("Location: ../index.php");
        } else {
          header("Location: ../error.php");
        }
      }
    } else {
      header("Location: ../error.php");
    }
  }
}

?>
