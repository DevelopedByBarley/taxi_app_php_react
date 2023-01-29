<?php
function getConnection()
{
  $serverName = "localhost";
  $userName = "Barley";
  $password = "Csak1enter";
  $dbName = "taxi_app";

  return new PDO(
    "mysql:host=$serverName;dbname=$dbName",
    $userName,
    $password
  );
}
