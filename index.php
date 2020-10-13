<?php

session_start();

?>

<!DOCTYPE html>
<html>
<head>

	<meta charset="utf-8">

	<title>Index</title>

	<link href="css/style.css" rel="stylesheet" type="text/css">

</head>
<body>

<?php
	if(!isset($_SESSION["login"]))
	{
		echo "<div class='loginContainer'>";
			echo "<form class='loginForm' method='POST' action='includes/login.inc.php'>";

				echo "<label>Username: </label><input type='text' name='username'>";
				echo "<label>Password: </label><input type='password' name='password'>";

				echo "<button type='submit' name='submit'>login</button>";

				echo "</form>";
			echo "</div>";
		}
?>

<?php

	if(isset($_SESSION["login"]))
	{
		echo "<canvas id='snakeCanvas' width='900px' height='900px'></canvas>";
		echo "<div class='logoutDiv'>";
		echo 	"<a href='includes/logout.inc.php'>logout</a>";
		echo "</div>";
	}

?>

<script src='js/snake.js'></script>

</body>
</html>
