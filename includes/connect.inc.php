<?php 
	
	$host = "yourhosthere";
	$user = "yourusernamehere";
	$pass = "";
	$db = "yourdbhere";
	$charset = "yourcharsethere";

	$pdoDSN = "mysql:host=".$host.";dbname=".$db.";charset=".$charset.""; 

	try 
	{
		$pdo = new PDO($pdoDSN, $user, $pass);
	} catch (PDOException $exception) {
    	echo 'Connection failed : ' . $exception->getMessage();
	}

?>