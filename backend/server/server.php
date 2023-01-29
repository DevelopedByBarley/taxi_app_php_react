<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


include "../db/connectToDb.php";

$method = $_SERVER["REQUEST_METHOD"];
$parsed = parse_url($_SERVER["REQUEST_URI"]);
$path = $parsed["path"];

$routes  = [
  "GET" => [
    "/backend/server/server.php/cars" => "carsHandler",
    "/backend/server/server.php/delete-car" => "deleteCarHandler",
    "/backend/server/server.php/trips" => "getTrips",
    "/backend/server/server.php/delete-trip" => "deleteTripHandler",
  ],
  "POST" => [
    "/backend/server/server.php/add-car" => "postCarHandler",
    "/backend/server/server.php/update-car" => "updateCarHandler",
    "/backend/server/server.php/add-trip" => "addTripHandler"
  ]
];


$routesHandler = $routes[$method][$path] ?? "notFoundHandler";

$routesHandler();


// GET cars
function carsHandler()
{
  $pdo = getConnection();
  $statement = $pdo->prepare("SELECT * FROM `cars`");
  $statement->execute();
  $cars = $statement->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($cars);
}


// POST car 

function postCarHandler()
{
  $_POST = json_decode(file_get_contents("php://input"), true);

  $carName = $_POST["name"];
  $licenceNumber = $_POST["licenceNumber"];
  $hourlyRate = $_POST["hourlyRate"];


  $pdo = getConnection();

  $statement = $pdo->prepare(
    "INSERT INTO `cars` 
    (`id`, `name`, `licenseNumber`, `hourlyRate`) 
  VALUES 
    (NULL, :carName, :licenceNumber, :hourlyRate)"
  );

  $statement->execute([
    "carName" =>  $carName,
    "licenceNumber" => $licenceNumber,
    "hourlyRate" => $hourlyRate
  ]);

  carsHandler();
}



// DELETE car

function deleteCarHandler()
{
  $carId = $_GET["id"];
  echo $carId;

  //DELETE FROM `cars` WHERE `cars`.`id` = 3

  $pdo = getConnection();
  $statement = $pdo->prepare("DELETE FROM `cars` WHERE `cars`.`id` = ?");
  $statement->execute([$carId]);

  $statement = $pdo->prepare("SELECT * FROM `cars`");
  $statement->execute();


  carsHandler();
}


// Update Car

//UPDATE `cars` SET `name` = 'Mercedes Benz 1', `licenseNumber` = 'XCV-132' WHERE `cars`.`id` = 9;

function updateCarHandler()
{
  $carId = $_GET["id"];
  $_POST = json_decode(file_get_contents("php://input"), true);

  $carName = $_POST["name"];
  $licenceNumber = $_POST["licenceNumber"];
  $hourlyRate = $_POST["hourlyRate"];

  $pdo = getConnection();
  $statement = $pdo->prepare(
    "UPDATE `cars` SET 
    `name` = :carName, 
    `licenseNumber` = :licenceNumber, 
    `hourlyRate` = :hourlyRate 
  WHERE `cars`.
    `id` = :carId;"
  );
  $statement->execute([
    'carName' => $carName,
    'licenceNumber' => $licenceNumber,
    'hourlyRate' => $hourlyRate,
    'carId' => $carId
  ]);


  carsHandler();
}




// GET Trips

function getTrips()
{
  $carId = $_GET["carId"];
  $pdo = getConnection();
  $statement = $pdo->prepare("SELECT * FROM `trips` WHERE carId = ?");
  $statement->execute([$carId]);


  $trips = $statement->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($trips);
}

// POST trip


function addTripHandler()
{
  $_POST = json_decode(file_get_contents("php://input"), true);
  $carId = $_GET["carId"];


  $numberOfMinutes = $_POST["numberOfMinutes"];
  $date = $_POST["date"];
  $hourlyRate = $_POST["hourlyRate"];


  $pdo = getConnection();
  $statement = $pdo->prepare(
  "INSERT INTO `trips` 
    (`id`, `numberOfMinutes`, `date`, `hourlyRate`, `carId`) 
    VALUES 
    (NULL, :numberOfMinutes, :currentDate,:hourlyRate , :carId);"
  );

  $statement->execute([
    'numberOfMinutes' => $numberOfMinutes,
    'currentDate' => $date,
    'hourlyRate' => $hourlyRate,
    'carId' => $carId
  ]);


  echo json_encode([
    "numberOfMinutes" => $numberOfMinutes,
    "date" => $date,
    "hourlyRate" => $hourlyRate
  ]);
}


// DELETE trip

function deleteTripHandler()
{
  $tripId = $_GET["tripId"];


  $pdo = getConnection();
  $statement = $pdo->prepare("DELETE FROM `trips` WHERE `trips`.`id` =  ?");
  $statement->execute([$tripId]);
  $statement->fetchAll(PDO::FETCH_ASSOC);

  echo "Trip deleted succesfully!";
}



function notFoundHandler()
{
  echo "Page is not found";
};
