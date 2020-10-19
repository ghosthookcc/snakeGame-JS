<?php

	$host = "localhost";
	$user = "root";
	$pass = "";
	$db = "snakedb";
	$charset = "utf8mb4";

	$pdoDSN = "mysql:host=".$host.";dbname=".$db.";charset=".$charset."";

	try
	{
		$pdo = new PDO($pdoDSN, $user, $pass);
	} catch (PDOException $exception) {
    	echo 'Connection failed : ' . $exception->getMessage();
	}

?>
