<!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">

  <title>create</title>

  <link href="css/style.css" rel="stylesheet" type="text/css">

</head>
<body>

  <div class="addUserContainer">
    <form class="addUserForm" action="includes/addUser.inc.php" method="POST">
      <a href="index.php">back</a>

      <label>Username: </label><input type="text" name="username">
      <label>Password: </label><input type="password" name="password">

      <button type="submit" name="addUser">add</button>

    </form>
  </div>

</body>
</html>
