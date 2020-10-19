<?php

include_once("connect.inc.php");

if(isset($_POST["addUser"])) {

  $username = $_POST["username"];
  $password = $_POST["password"];

  if(!strlen($username) > 0 || !strlen($password) > 0) {

    header("Location: ../error.php");

  }
  else
  {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $selectQuery = "SELECT username FROM users WHERE username=?";
    $insertQuery = "INSERT INTO users (username, password)
                    VALUES (?, ?)";

    $statement = $pdo->prepare($selectQuery);
    $statement->execute([$username, $email]);

    if($statement->rowCount() > 0)
    {
	     while($row = $statement->fetch())
       {
          if($row[0] === $username || $row[1] == $email)
          {
            header("Location: ../error.php");
          }
       }
    } else {
      $statment = $pdo->prepare($insertQuery);

      if($statment->execute([$username, $hashedPassword]))
      {
        header("Location: ../index.php");
      }
      else
      {
        header("Location: ../error.php");
      }
    }
  }
}

?>
